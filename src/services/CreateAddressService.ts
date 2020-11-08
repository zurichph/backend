import Addresses from '../models/Addresses';
import AddressesRepository from '../repositories/AddressesRepository';
import AddressValidator from './ValidateAddresssService';

class CreateAddressService {
  private addressRepository: AddressesRepository;

  constructor(addressRepository: AddressesRepository) {
    this.addressRepository = addressRepository;
  }

  public async execute({
    Name1,
    Name2,
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
      !Name1
      || !phone
      || !streetName
      || !streetNumber
      || !neighborhood
      || !city
      || state === undefined
    ) {
      throw new Error('Campos obrigatórios faltantes.');
    }
    let name = `${Name1} ${Name2}`;
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
    name = validated.getName;
    phone = validated.getPhone; // eslint-disable-line no-param-reassign
    streetName = validated.getStreetName; // eslint-disable-line no-param-reassign
    streetNumber = validated.getStreetNumber; // eslint-disable-line no-param-reassign
    neighborhood = validated.getNeighborhood; // eslint-disable-line no-param-reassign
    city = validated.getCity; // eslint-disable-line no-param-reassign
    // eslint-disable-next-line no-param-reassign
    state = AddressValidator.stateStrToInt(validated.getState);
    complement = validated.getComplement; // eslint-disable-line no-param-reassign
    observation = validated.getObservation; // eslint-disable-line no-param-reassign
    if (Array.isArray(name)) {
      [Name1, Name2] = [name[0], name[1]]; // eslint-disable-line no-param-reassign
    } else {
      Name1 = name; // eslint-disable-line no-param-reassign
      Name2 = ''; // eslint-disable-line no-param-reassign
    }
    const user = await this.addressRepository.create({
      Name1,
      Name2,
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

export default CreateCostumerService;
