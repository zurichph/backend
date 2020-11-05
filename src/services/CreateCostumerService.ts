import Costumers from '../models/Costumers';
import CostumersRepository from '../repositories/CostumersRepository';

class CreateCostumerService {
  private costumersRepository: CostumersRepository;

  constructor(costumersRepository: CostumersRepository) {
    this.costumersRepository = costumersRepository;
  }

  public async execute({ name, cpf, telefone }: Omit<Costumers, '_id'>): Promise<unknown> {
    if (name === undefined || telefone === undefined) {
      throw new Error('Nome e telefone são obrigatórios.');
    }

    if (telefone.length > 11 || telefone.length < 10) {
      throw new Error('Telefone inválido.');
    }

    const user = await this.costumersRepository.create({
      name,
      cpf,
      telefone,
    });

    return user;
  }
}

export default CreateCostumerService;
