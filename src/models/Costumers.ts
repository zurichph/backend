class Costumers {
  name: string;

  cpf?: string;

  addressId: string;

  constructor({ name, cpf, addressId }: Costumers) {
    this.addressId = addressId;
    this.name = name;
    this.cpf = cpf;
  }
}

export default Costumers;
