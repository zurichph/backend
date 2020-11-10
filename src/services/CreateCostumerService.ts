import Costumers from '../models/Costumers';
import CostumersRepository from '../repositories/CostumersRepository';

class CreateCostumerService {
  private costumersRepository: CostumersRepository;

  constructor(costumersRepository: CostumersRepository) {
    this.costumersRepository = costumersRepository;
  }

  public async execute({ name, cpf, addressId }: Omit<Costumers, '_id'>): Promise<unknown> {
    if (name === undefined) {
      throw new Error('Nome obrigatório.');
    }

    const user = await this.costumersRepository.create({
      name,
      cpf,
      addressId,
    });

    return user;
  }
}

export default CreateCostumerService;
