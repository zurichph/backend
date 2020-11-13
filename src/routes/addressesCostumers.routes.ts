import { Router } from 'express';
import Addresses from '../models/Addresses';
import AddressesRepository from '../repositories/AddressesRepository';

interface AddressWithCostumer extends Addresses {
    CostumerId: string;
}

const costumersAdresses = Router();
const addressesRepository = new AddressesRepository();

costumersAdresses.get('/:AddressId', async (req, res) => {
  const { AddressId } = req.params;
  try {
    const addresses = addressesRepository.read(AddressId);
    return res.json(addresses);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

/* costumersAdresses.post('/:CostumerId', async (req, res) => {
  const {
    CostumerId,
    zipCode,
    streetName,
    streetNumber,
    neighborhood,
    city,
    state,
    complement,
  }: AddressWithCostumer = req.params;
  try {

  }

}); */ // TODO create repository that populates a costumer with our newly created address

export default costumersAdresses;
