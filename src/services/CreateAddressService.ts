import Addresses from '../models/Addresses';
import AddressesRepository from '../repositories/AddressesRepository';

class CreateAddressService {
  private addressRepository: AddressesRepository;

  addressId: string;

  constructor(addressRepository: AddressesRepository) {
    this.addressRepository = addressRepository;
    this.addressId = '';
  }

  public async execute({
    zipCode,
    streetName,
    streetNumber,
    neighborhood,
    city,
    state,
    complement,
    observation,
  }: Omit<Addresses, '_id'>): Promise<unknown> {
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

    const newAddress: Addresses = {
      zipCode,
      streetName,
      streetNumber,
      neighborhood,
      city,
      state,
      complement,
      observation,
    };
    const address = await this.addressRepository.create(newAddress);
    this.addressId = this.addressRepository.addressId;
    return address;
  }
}

export default CreateAddressService;
