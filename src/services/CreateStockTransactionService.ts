import StockTransactionsRepository from '../repositories/StockTransactionsRepository';

interface Request {
  productId: string;
  quantity: number;
  type: 'income' | 'outcome';
  stockId: string;
}

class CreateStockTransactionService {
  private stockTransactionRepository: StockTransactionsRepository;

  constructor(stockTransactionRepository: StockTransactionsRepository) {
    this.stockTransactionRepository = stockTransactionRepository;
  }

  public async execute({
    productId, quantity, type, stockId,
  }: Request): Promise<unknown> {
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Invalid type.');
    }

    const { total } = await this.stockTransactionRepository.getBalance({ stockId, productId });

    if (type === 'outcome' && total < quantity) {
      throw new Error('Não há produtos suficientes.');
    }

    const transaction = await this.stockTransactionRepository.create({
      productId, quantity, type, stockId,
    });

    return transaction;
  }
}

export default CreateStockTransactionService;
