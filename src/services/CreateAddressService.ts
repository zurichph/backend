import Addresses from '../models/Addresses';
import AddressesRepository from '../repositories/AddressesRepository';

interface addressWithId extends Addresses {
  addressId: string;
}

class CreateAddressService {
  private addressRepository = new AddressesRepository();

  addressId = '';

  public async execute({
    zipCode,
    streetName,
    streetNumber,
    neighborhood,
    city,
    state,
    complement,
    observation,
  }: Addresses): Promise<addressWithId> {
    if (
      !zipCode
      || !streetName
      || !streetNumber
      || !neighborhood
      || !city
      || !state
    ) {
      throw new Error('Campos obrigatórios faltantes.');
    }

    const newAddress = await this.addressRepository.create(<Addresses> {
      zipCode,
      streetName,
      streetNumber,
      neighborhood,
      city,
      state,
      complement,
      observation,
    });
    this.addressId = this.addressRepository.addressId;
    const address: addressWithId = { addressId: this.addressId, ...newAddress };
    return address;
  }
}

export default CreateAddressService;
