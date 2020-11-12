import Costumers from '../models/Costumers';
import Costumer from '../schemas/Costumer';
import AddressesRepository from './AddressesRepository';

interface UpdateCostumer {
  clientId: string;
  name: string;
  cpf: string;
}

class CostumersRepository {
  public addressId: string;

  constructor() {
    this.addressId = '';
  }

  public async create({ name, cpf, addressId }: Costumers): Promise<unknown> {
    const costumer = new Costumers({ name, cpf, addressId });

    try {
      return await new Costumer(costumer).save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async update({
    clientId, name, cpf,
  }: UpdateCostumer): Promise<unknown> {
    const costumerBeforeUpdate = await Costumer.findById(clientId);

    try {
      this.addressId = costumerBeforeUpdate?.toObject().addressId;
      return await Costumer.findOneAndUpdate({ _id: clientId }, {
        $set: {
          name: name || costumerBeforeUpdate?.toObject().name,
          cpf: cpf || costumerBeforeUpdate?.toObject().cpf,
        },
      }, { new: true });
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
    const Address = new AddressesRepository();

    await Costumer.deleteOne({ _id: id });
    await Address.delete(linkedAddress);
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
