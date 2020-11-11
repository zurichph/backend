import Addresses from '../models/Addresses';
import AddressesRepository from '../repositories/AddressesRepository';
import AddressValidator from './ValidateAddresssService';

class CreateAddressService {
  private addressRepository: AddressesRepository;

  addressId: string;

  constructor(addressRepository: AddressesRepository) {
    this.addressRepository = addressRepository;
    this.addressId = '';
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
      || typeof state !== 'number'
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
    const Name = validated.getName;
    const Phone = validated.getPhone;
    const StreetName = validated.getStreetName;
    const StreetNumber = validated.getStreetNumber;
    const Neighborhood = validated.getNeighborhood;
    const City = validated.getCity;
    const State = AddressValidator.stateStrToInt(validated.getState);
    const Complement = validated.getComplement;
    const Observation = validated.getObservation;

    const newAddress: Addresses = {
      name: Name,
      phone: Phone,
      streetName: StreetName,
      streetNumber: StreetNumber,
      neighborhood: Neighborhood,
      city: City,
      state: State,
      complement: Complement,
      observation: Observation,
    };
    const address = await this.addressRepository.create(newAddress);
    this.addressId = this.addressRepository.addressId;
    return address;
  }
}

export default CreateAddressService;
