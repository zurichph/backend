class Stocks {
  name: string;

  address: {
    cep: string;
    street: string;
    complement: string;
    neighborhood: string;
    number: string;
    city: string;
    state: string;
  };

  constructor({ name, address }: Stocks) {
    this.name = name;
    this.address = address;
  }
}

export default Stocks;
