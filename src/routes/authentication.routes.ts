import { Router } from 'express';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

const authenticationRouter = Router();
const usersRepository = new UsersRepository();

authenticationRouter.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    const authorization = await usersRepository.login({ username, password });

    return res.json({ authorization });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

authenticationRouter.put('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    const createUserService = new CreateUserService(usersRepository);
    const create = await createUserService.execute({ username, password });

    return res.json(create);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

export default authenticationRouter;
