import Addresses from '../models/Addresses';
import Address from '../schemas/Address';

interface UpdateAddress extends Addresses {
  AddressId: string;
}

class AddressesRepository {
  public async create({
    name,
    phone = '',
    streetName,
    streetNumber,
    neighborhood,
    city,
    state,
    complement = '',
    observation = '',
  }: Addresses): Promise<unknown> {
    const values = {
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

    const AddressExists = await Address.findOne({ phone });
    if (AddressExists) {
      throw new Error(
        'Este telefone já esta sendo utilizado por um outro cliente.',
      );
    }
    try {
      return await new Address(values).save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async update({
    AddressId,
    name,
    phone,
    streetName,
    streetNumber,
    neighborhood,
    city,
    state,
    complement,
    observation,
  }: UpdateAddress): Promise<unknown> {
    const AddressExists = await Address.findOne({ phone });
    if (AddressExists && AddressExists.toObject().__id !== AddressId) {
      throw new Error(
        'Este telefone já esta sendo utilizado por um outro cliente.',
      );
    }
    const addressBeforeUpdate = await Address.findById(AddressId);

    try {
      return await Address.findOneAndUpdate(
        { _id: AddressId },
        {
          $set: {
            name: name || addressBeforeUpdate?.toObject().Name,
            phone: phone || addressBeforeUpdate?.toObject().phone,
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
