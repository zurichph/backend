import { Document } from 'mongoose';
import StockTransactions from '../models/StockTransactions';
import StockTransaction from '../schemas/StockTransaction';
import ProductsRepository, { ProductsWithId } from './ProductsRepository';

interface CreateTransactionDTO {
  productId: string;
  quantity: unknown;
  type: 'income' | 'outcome';
  stockId: string;
}

interface GetBalance {
  stockId: string;
  productId: string;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface ProductsInfo {
  name: string;
  balance: Array<Balance>;
  _id: string;
}

class StockTransactionsRepository {
  public async create({
    productId, quantity, type, stockId,
  }: CreateTransactionDTO): Promise<StockTransactions> {
    const transaction = new StockTransactions({
      productId, quantity, type, stockId,
    });

    try {
      const newStockTransactions = await new StockTransaction(transaction).save();
      return newStockTransactions?.toObject();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getBalanceOfAllProducts(stockId: string): Promise<Array<ProductsInfo>> {
    const productsRepository = new ProductsRepository();
    const products: ProductsWithId[] = await productsRepository.all();
    const productsInfo: Array<ProductsInfo> = [];

    await Promise.all(products.map(async (product: ProductsWithId) => {
      const balance: Balance = await this.getBalance({ stockId, productId: product._id });
      const arrayInfo: ProductsInfo = {
        name: product.name,
        balance: [balance],
        _id: String(product._id),
      };

      productsInfo.push(arrayInfo);
    }));

    return productsInfo;
  }

  public async getBalance({ stockId, productId }: GetBalance): Promise<Balance> {
    const fetchedTransactions = await StockTransaction.find({ stockId, productId });
    const transactions: StockTransactions[] = fetchedTransactions.map(
      (transaction: Document) => {
        const t = transaction.toObject();
        return t;
      },
    );

    const { income, outcome } = transactions.reduce(
      (accumulator: Balance,
        transaction: StockTransactions) => {
        switch (transaction.type) {
          case 'income':
            if (typeof transaction.quantity === 'number') {
              accumulator.income += transaction.quantity;
            } else if (typeof transaction.quantity === 'string') {
              accumulator.income += parseInt(transaction.quantity, 10);
            }
            break;
          case 'outcome':
            if (typeof transaction.quantity === 'number') {
              accumulator.outcome += transaction.quantity;
            } else if (typeof transaction.quantity === 'string') {
              accumulator.outcome += parseInt(transaction.quantity, 10);
            }
            break;
          default:
            break;
        }

        return accumulator;
      }, {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }
}

export default StockTransactionsRepository;
