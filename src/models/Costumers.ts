class Costumers {
  name: string;

  cpf?: string;

  telefone: string;

  constructor({ name, cpf, telefone }: Costumers) {
    this.name = name;
    this.cpf = cpf;
    this.telefone = telefone;
  }
}

export default Costumers;
