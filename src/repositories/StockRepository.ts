import Stocks from '../models/Stocks';
import Stock from '../schemas/Stock';

class StockRepository {
  public async create({ name, address }: Stocks): Promise<Stocks> {
    const stock = new Stocks({ name, address });

    try {
      const newStock = await new Stock(stock).save();
      return newStock?.toObject();
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

  public async all(): Promise<Stocks[]> {
    const stocks = await Stock.find({});
    const stocksObj: Stocks[] = stocks.map((stock) => {
      const s: Stocks = stock.toObject();
      return s;
    });
    return stocksObj;
  }
}

export default StockRepository;
