import Costumers from '../models/Costumers';
import Costumer from '../schemas/Costumer';
import AddressesRepository from './AddressesRepository';

interface UpdateCostumer {
  clientId: string;
  name: string;
  cpf: string;
  telefone: string;
}

class CostumersRepository {
  public async create({ name, cpf, telefone }: Costumers): Promise<Costumers> {
    const costumer = new Costumers({ name, cpf, telefone });

    const CostumerExists = await Costumer.findOne({ telefone });
    if (CostumerExists) {
      throw new Error(
        'Este telefone já esta sendo utilizado por um outro cliente.',
      );
    }

    try {
      return await (await new Costumer(costumer).save()).toObject();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async update({
    clientId,
    name,
    cpf,
    telefone,
  }: UpdateCostumer): Promise<unknown> {
    const TelefoneExists = await Costumer.findOne({ telefone });
    if (TelefoneExists && TelefoneExists.toObject()._id !== clientId) {
      throw new Error(
        'Este telefone já esta sendo utilizado por um outro cliente.',
      );
    }

    const costumerBeforeUpdate = await Costumer.findById(clientId);

    try {
      return await Costumer.findOneAndUpdate(
        { _id: clientId },
        {
          $set: {
            name: name || costumerBeforeUpdate?.toObject().name,
            cpf: cpf || costumerBeforeUpdate?.toObject().cpf,
            telefone: telefone || costumerBeforeUpdate?.toObject().telefone,
          },
        },
        { new: true },
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async delete(id: string): Promise<boolean> {
    const exists = await Costumer.findById(id);
    if (!exists) {
      throw new Error('Este cliente não existe.');
    }

    const linkedAddress = exists.toObject()?.addressId;

    await Costumer.deleteOne({ _id: id });
    if (linkedAddress) {
      const Address = new AddressesRepository();
      await Address.delete(linkedAddress);
    }

    return true;
  }

  public async all(page: string | number): Promise<unknown> {
    if (typeof page === 'string') {
      const costumers = await Costumer.find({})
        .limit(25)
        .skip(parseInt(page, 10) * 25);
      return costumers;
    }
    const costumers = await Costumer.find({})
      .limit(25)
      .skip(page * 25);
    return costumers;
  }
}

export default CostumersRepository;
