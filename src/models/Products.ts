class Products {
  name: string;

  price: number;

  constructor({ name, price }: Products) {
    this.name = name;
    this.price = price;
  }
}

export default Products;
