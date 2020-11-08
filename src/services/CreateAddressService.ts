import Addresses from '../models/Addresses';
import AddressesRepository from '../repositories/AddressesRepository';
import AddressValidator from './ValidateAddresssService';

class CreateAddressService {
  private addressRepository: AddressesRepository;

  constructor(addressRepository: AddressesRepository) {
    this.addressRepository = addressRepository;
  }

  public async execute({
    name,
    phone,
    streetName,
    streetNumber,
    neighborhood,
    city,
    state,
    complement,
    observation,
  }: Omit<Addresses, '_id'>): Promise<unknown> {
    if (
      !name
      || !phone
      || !streetName
      || !streetNumber
      || !neighborhood
      || !city
      || state === undefined
    ) {
      throw new Error('Campos obrigatórios faltantes.');
    }
    const validated = new AddressValidator({
      name,
      phone,
      streetName,
      streetNumber,
      neighborhood,
      city,
      state,
      complement,
      observation,
    });
    name = validated.getName; // eslint-disable-line no-param-reassign
    phone = validated.getPhone; // eslint-disable-line no-param-reassign
    streetName = validated.getStreetName; // eslint-disable-line no-param-reassign
    streetNumber = validated.getStreetNumber; // eslint-disable-line no-param-reassign
    neighborhood = validated.getNeighborhood; // eslint-disable-line no-param-reassign
    city = validated.getCity; // eslint-disable-line no-param-reassign
    // eslint-disable-next-line no-param-reassign
    state = AddressValidator.stateStrToInt(validated.getState);
    complement = validated.getComplement; // eslint-disable-line no-param-reassign
    observation = validated.getObservation; // eslint-disable-line no-param-reassign
    let Name1 = '';
    let Name2 = '';
    if (Array.isArray(name)) {
      [Name1, Name2] = [name[0], name[1]];
    } else {
      Name1 = name;
    }
    const user = await this.addressRepository.create({
      name,
      phone,
      streetName,
      streetNumber,
      neighborhood,
      city,
      state,
      complement,
      observation,
    });
    return user;
  }
}

export default CreateAddressService;
