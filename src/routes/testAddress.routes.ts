import { Router } from 'express';
import AddressRepository from '../repositories/AddressesRepository';
import CreateAddressService from '../services/CreateAddressService';

const AddressRouter = Router();
const addressRepository = new AddressRepository();

AddressRouter.post('/test/', async (req, res) => {
  try {
    const {
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

    const AddressService = new CreateAddressService(addressRepository);
    const costumer = await AddressService.execute({
      name, phone, streetName, streetNumber, neighborhood, city, state, complement, observation,
    });

    return res.json({ costumer });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

export default AddressRouter;
