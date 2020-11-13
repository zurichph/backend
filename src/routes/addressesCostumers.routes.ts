import { Router } from 'express';
import Addresses from '../models/Addresses';
import AddressesRepository from '../repositories/AddressesRepository';
import CostumersRepository from '../repositories/CostumersRepository';
import CreateAddressService from '../services/CreateAddressService';

const costumersAdresses = Router();
const addressesRepository = new AddressesRepository();

costumersAdresses.get('/:AddressId', async (req, res) => {
  const { AddressId } = req.params;
  try {
    const addresses = await addressesRepository.read(AddressId);
    return res.json(addresses);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

costumersAdresses.post('/:CostumerId', async (req, res) => {
  const {
    CostumerId,
    zipCode,
    streetName,
    streetNumber,
    neighborhood,
    city,
    state,
    complement,
    observation,
  } = req.params;
  const createAddressService = new CreateAddressService();
  const costumersRepository = new CostumersRepository();
  const address: Addresses = {
    zipCode,
    streetName,
    streetNumber: parseInt(streetNumber, 10),
    neighborhood,
    city,
    state,
    complement,
    observation,
  };
  try {
    const newAddress = await createAddressService.execute(address);
    const updatedCostumer = await costumersRepository.updateAddress(CostumerId,
      newAddress.addressId);
    return res.status(200).json(newAddress).json(updatedCostumer);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

costumersAdresses.put('/:addressId', async (req, res) => {
  const {
    addressId,
    zipCode,
    streetName,
    streetNumber,
    neighborhood,
    city,
    state,
    complement,
    observation,
  } = req.params;
  try {
    const newAddress = await addressesRepository.update({
      AddressId: addressId,
      zipCode,
      streetName,
      streetNumber: parseInt(streetNumber, 10),
      neighborhood,
      city,
      state,
      complement,
      observation,
    });
    return res.status(200).json(newAddress);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

export default costumersAdresses;
