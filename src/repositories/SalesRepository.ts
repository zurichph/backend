import Sales from '../models/Sales';
import CreateStockTransactionService from '../services/CreateStockTransactionService';
import StockTransactionsRepository from './StockTransactionsRepository';

class SalesRepository {
  public async create({
    stockId, clientId, products, subTotal, shippmentPrice,
    totalPrice, paymentMethod, observations, receipt, cancelled,
  }: Sales): Promise<Sales> {
    const stockTransactionRepository = new StockTransactionsRepository();
    const createStockTransaction = new CreateStockTransactionService(stockTransactionRepository);

    const sale = new Sales({
      stockId,
      clientId,
      products,
      subTotal,
      shippmentPrice,
      totalPrice,
      paymentMethod,
      observations,
      receipt,
      cancelled,
    });

    return sale;
  }
}

export default SalesRepository;
