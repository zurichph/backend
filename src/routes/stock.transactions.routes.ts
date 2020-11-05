import { Router } from 'express';
import StockTransactionsRepository from '../repositories/StockTransactionsRepository';
import CreateStockTransactionService from '../services/CreateStockTransactionService';

const stockTransactionsRouter = Router();
const stockTransactionsRepository = new StockTransactionsRepository();

stockTransactionsRouter.post('/', async (req, res) => {
  try {
    const {
      productId, quantity, type, stockId,
    } = req.body;

    const createTransactionService = new CreateStockTransactionService(stockTransactionsRepository);

    const transaction = await createTransactionService.execute({
      productId, quantity, type, stockId,
    });

    return res.json(transaction);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

stockTransactionsRouter.get('/:stockId', async (req, res) => {
  try {
    const { stockId } = req.params;

    const products = await stockTransactionsRepository.getBalanceOfAllProducts(stockId);

    return res.json({ products });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

stockTransactionsRouter.get('/:stockId/:productId', async (req, res) => {
  try {
    const { stockId, productId } = req.params;

    const balance = await stockTransactionsRepository.getBalance({ stockId, productId });

    return res.json({ balance });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

export default stockTransactionsRouter;
