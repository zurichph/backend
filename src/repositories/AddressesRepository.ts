import Addresses from '../models/Addresses';
import Address from '../schemas/Address';

export interface UpdateAddress extends Addresses {
  AddressId: string;
}

class AddressesRepository {
  public addressId = '';

  public async create({
    zipCode,
    streetName,
    streetNumber,
    neighborhood,
    city,
    state,
    complement = '',
    observation = '',
  }: Addresses): Promise<unknown> {
    const values = {
      zipCode,
      streetName,
      streetNumber,
      neighborhood,
      city,
      state,
      complement,
      observation,
    };

    try {
      const newAddress = await new Address(values).save();
      this.addressId = newAddress._id;
      return newAddress;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async update({
    AddressId,
    zipCode,
    streetName,
    streetNumber,
    neighborhood,
    city,
    state,
    complement,
    observation,
  }: UpdateAddress): Promise<unknown> {
    const addressBeforeUpdate = await Address.findById(AddressId);

    try {
      return await Address.findOneAndUpdate(
        { _id: AddressId },
        {
          $set: {
            zipCode: zipCode || addressBeforeUpdate?.toObject().zipCode,
            streetName:
              streetName || addressBeforeUpdate?.toObject().streetName,
            streetNumber:
              streetNumber || addressBeforeUpdate?.toObject().streetNumber,
            neighborhood:
              neighborhood || addressBeforeUpdate?.toObject().neighborhood,
            city: city || addressBeforeUpdate?.toObject().city,
            state: state || addressBeforeUpdate?.toObject().state,
            complement:
              complement || addressBeforeUpdate?.toObject().complement,
            observation:
              observation || addressBeforeUpdate?.toObject().observation,
          },
        },
        { new: true },
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async delete(id: string): Promise<boolean> {
    const exists = await Address.findById(id);
    if (!exists) {
      throw new Error('Este endereço não existe.');
    }

    await Address.deleteOne({ _id: id });

    return true;
  }
}

export default AddressesRepository;
