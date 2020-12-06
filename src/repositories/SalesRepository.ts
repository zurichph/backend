import Sales from '../models/Sales';
import Sale from '../schemas/Sale';
import CreateStockTransactionService from '../services/CreateStockTransactionService';
import ProductsRepository, { ProductsWithId } from './ProductsRepository';
import StockTransactionsRepository from './StockTransactionsRepository';

interface RemoveItemFromStockDTO {
  productId: string;
  quantity: number;
}

interface AddItemOnStockDTO {
  productId: string;
  quantity: number;
  stockId: string;
}

class SalesRepository {
  public createStockTransaction;

  public stockTransactionRepository;

  public constructor() {
    this.stockTransactionRepository = new StockTransactionsRepository();
    this.createStockTransaction = new CreateStockTransactionService(
      this.stockTransactionRepository,
    );
  }

  public async all(page: string | number): Promise<Sales[]> {
    let Page: number;
    if (typeof page === 'string') {
      Page = parseInt(page, 10);
    } else {
      Page = page;
    }

    const sales = await Sale.find({})
      .limit(25)
      .skip(Page * 25);

    const salesObj: Sales[] = sales.map((sale) => {
      const c: Sales = sale.toObject();
      return c;
    });

    return salesObj;
  }

  public async create({
    stockId, createdBy, clientId, products, subTotal, shippmentPrice,
    totalPrice, paymentMethod, observations, receipt,
  }: Sales): Promise<Sales> {
    if (!['CREDIT_CARD', 'BILLET', 'DEPOSIT'].includes(paymentMethod)) {
      throw new Error('Invalid payment method.');
    }

    const productsRepository = new ProductsRepository();

    const removeItemFromStock = async ({
      productId, quantity,
    }: RemoveItemFromStockDTO): Promise<boolean> => {
      try {
        await this.createStockTransaction.execute({
          productId, quantity, type: 'outcome', stockId,
        });
        return true;
      } catch (error) {
        return false;
      }
    };

    try {
      let hasEnoughItems = '';

      const checkHasEnoughItems = async () => {
        await Promise.all(products.map(async (product) => {
        // recebe:
        // [ { 'product-uuid': 12 }, {}... ]
          const key = Object.keys(product)[0];
          const balance = await this.stockTransactionRepository.getBalance(
            { stockId, productId: key },
          );

          const quantidade: number = product[key];

          if (quantidade > balance.total) {
            hasEnoughItems = key;
          }
        }));
      };

      await checkHasEnoughItems();

      if (hasEnoughItems !== '') {
        const product: ProductsWithId = await productsRepository.getById(hasEnoughItems);

        throw new Error(`Produto <b>${product.name}</b> em falta para este estoque.`);
      }

      await Promise.all(products.map(async (product) => {
        const key = Object.keys(product)[0];
        const quantity: number = product[key];

        await removeItemFromStock({ productId: key, quantity });
      }));

      const sales = new Sales({
        stockId,
        createdBy,
        clientId,
        products,
        subTotal,
        shippmentPrice,
        totalPrice,
        paymentMethod,
        observations,
        receipt,
      });

      await new Sale(sales).save();

      return sales;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async cancel(id: string): Promise<Sales> {
    const sale = await Sale.findById(id);
    if (sale?.toObject().cancelled) {
      throw new Error('Pedido já cancelado.');
    }

    const addItemOnStock = async ({ productId, quantity, stockId }: AddItemOnStockDTO) => {
      await this.createStockTransaction.execute({
        productId, quantity, type: 'income', stockId,
      });
    };

    const newSale = await Sale.findOneAndUpdate({ _id: id },
      {
        $set: {
          cancelled: true,
        },
      }, { new: true });

    await Promise.all(newSale?.toObject().products.map(async (product: Record<string, number>) => {
      const key = Object.keys(product)[0];
      const quantity: number = product[key];

      await addItemOnStock({ productId: key, quantity, stockId: newSale?.toObject().stockId });
    }));

    return newSale?.toObject();
  }
}

export default SalesRepository;
