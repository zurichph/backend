import { Router } from 'express';
import SalesRepository from '../repositories/SalesRepository';

const salesRouter = Router();
const salesRepository = new SalesRepository();

salesRouter.post('/', async (req, res) => {
  try {
    const sale = await salesRepository.create(req.body);

    return res.json(sale);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

salesRouter.get('/:page', async (req, res) => {
  try {
    const { page } = req.params;

    const sales = await salesRepository.all(page);

    return res.json({ sales });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

salesRouter.put('/CANCEL/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await salesRepository.cancel(id);

    return res.json(sale);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

export default salesRouter;
