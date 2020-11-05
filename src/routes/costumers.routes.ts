import { Router } from 'express';
import CostumersRepository from '../repositories/CostumersRepository';
import CreateCostumerService from '../services/CreateCostumerService';

const costumersRouter = Router();
const costumersRepository = new CostumersRepository();

costumersRouter.get('/:page', async (req, res) => {
  const { page } = req.params;

  const costumers = await costumersRepository.all(page);

  res.json({ costumers });
});

costumersRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await costumersRepository.delete(id);

    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

costumersRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { cpf, telefone, name } = req.body;

    const costumer = await costumersRepository.update({
      clientId: id,
      cpf,
      telefone,
      name,
    });

    return res.json({ costumer });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

costumersRouter.post('/', async (req, res) => {
  try {
    const { cpf, telefone, name } = req.body;

    const costumersService = new CreateCostumerService(costumersRepository);
    const costumer = await costumersService.execute({
      cpf,
      telefone,
      name,
    });

    return res.json({ costumer });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

export default costumersRouter;
