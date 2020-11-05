import { Router } from 'express';
import ProductsRepository from '../repositories/ProductsRepository';

const productsRouter = Router();
const productsRepository = new ProductsRepository();

productsRouter.get('/', async (req, res) => {
  try {
    const products = await productsRepository.all();

    return res.json({ products });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

productsRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const product = await productsRepository.update({ productId: id, name, price });

    return res.json(product);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

productsRouter.post('/', async (req, res) => {
  try {
    const { name, price } = req.body;

    const product = await productsRepository.create({
      name,
      price,
    });

    return res.json(product);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

productsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await productsRepository.delete(id);

    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

export default productsRouter;
