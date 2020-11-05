/* eslint-disable @typescript-eslint/no-explicit-any */
import Products from '../models/Products';
import StockTransactions from '../models/StockTransactions';
import StockTransaction from '../schemas/StockTransaction';
import ProductsRepository from './ProductsRepository';

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
  balance: [];
  _id: string;
}

class StockTransactionsRepository {
  public async create({
    productId, quantity, type, stockId,
  }: CreateTransactionDTO): Promise<unknown> {
    const transaction = new StockTransactions({
      productId, quantity, type, stockId,
    });

    try {
      return await new StockTransaction(transaction).save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getBalanceOfAllProducts(stockId: string): Promise<ProductsInfo[]> {
    const productsRepository = new ProductsRepository();
    const products: Products[] | any = await productsRepository.all();
    const productsInfo: ProductsInfo | any = [];

    await Promise.all(products.map(async (product: any) => {
      const balance = await this.getBalance({ stockId, productId: product._id });
      const arrayInfo = { name: product.name, balance, _id: product._id };

      productsInfo.push(arrayInfo);
    }));

    return productsInfo;
  }

  public async getBalance({ stockId, productId }: GetBalance): Promise<Balance> {
    const transactions = await StockTransaction.find({ stockId, productId });

    const { income, outcome } = transactions.reduce((accumulator: Balance, transaction: any) => {
      switch (transaction.type) {
        case 'income':
          accumulator.income += transaction.quantity;
          break;
        case 'outcome':
          accumulator.outcome += transaction.quantity;
          break;
        default:
          break;
      }

      return accumulator;
    }, {
      income: 0,
      outcome: 0,
      total: 0,
    });

    const total = income - outcome;

    return { income, outcome, total };
  }
}

export default StockTransactionsRepository;
