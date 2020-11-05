import Stocks from '../models/Stocks';
import Stock from '../schemas/Stock';

class StockRepository {
  public async create({ name }: Stocks): Promise<unknown> {
    const stock = new Stocks({ name });

    try {
      return await new Stock(stock).save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async delete(id: string): Promise<boolean> {
    const exists = await Stock.findById(id);

    if (!exists) {
      throw new Error('Este estoque não existe.');
    }

    await Stock.deleteOne({ _id: id });

    return true;
  }

  public async all(): Promise<unknown> {
    const stocks = await Stock.find({});

    return stocks;
  }
}

export default StockRepository;
