import { Router } from 'express';
import StockRepository from '../repositories/StockRepository';

const stockRouter = Router();
const stockRepository = new StockRepository();

stockRouter.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    const stock = await stockRepository.create({ name });

    return res.json(stock);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

stockRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await stockRepository.delete(id);

    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

stockRouter.get('/', async (req, res) => {
  try {
    const stocks = await stockRepository.all();

    return res.json({ stocks });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

export default stockRouter;
