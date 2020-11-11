import { Router } from 'express';
import CostumersRepository from '../repositories/CostumersRepository';
import CreateCostumerService from '../services/CreateCostumerService';
import AddressesRepository, { UpdateAddress } from '../repositories/AddressesRepository';
import CreateAddressService from '../services/CreateAddressService';
import Addresses from '../models/Addresses';

const costumersRouter = Router();
const costumersRepository = new CostumersRepository();
const addressesRepository = new AddressesRepository();

costumersRouter.get('/:page', async (req, res) => {
  const { page } = req.params;

  const costumers = await costumersRepository.all(page);

  res.json({ costumers });
});

costumersRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // This deletes the linked address as well
    await costumersRepository.delete(id);

    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

costumersRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      cpf,
      name,
      phone,
      streetName,
      streetNumber,
      neighborhood,
      city,
      state,
      complement,
      observation,
    } = req.body;

    const costumer = await costumersRepository.update({
      clientId: id,
      cpf,
      name,
    });
    const { addressId } = costumersRepository;
    const newAddress: UpdateAddress = {
      AddressId: addressId,
      name,
      phone,
      streetName,
      streetNumber,
      neighborhood,
      city,
      state,
      complement,
      observation,
    };
    await addressesRepository.update(newAddress);

    return res.json({ costumer });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

costumersRouter.post('/', async (req, res) => {
  try {
    const {
      cpf,
      name,
      phone,
      streetName,
      streetNumber,
      neighborhood,
      city,
      state,
      complement,
      observation,
    } = req.body;
    const newAddress: Addresses = {
      name,
      phone,
      streetName,
      streetNumber,
      neighborhood,
      city,
      state,
      complement,
      observation,
    };
    const addressesService = new CreateAddressService(addressesRepository);
    await addressesService.execute(newAddress);
    const { addressId } = addressesService;
    const costumersService = new CreateCostumerService(costumersRepository);
    const costumer = await costumersService.execute({ addressId, name, cpf });

    return res.json({ costumer });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

export default costumersRouter;
