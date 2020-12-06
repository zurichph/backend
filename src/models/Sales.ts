class Sales {
  stockId: string;

  createdBy: string;

  clientId: string;

  products: Array<Record<string, number>>;

  subTotal: number;

  shippmentPrice: number;

  totalPrice: number;

  paymentMethod: string;

  observations?: string;

  receipt: string;

  constructor({
    stockId, createdBy, clientId, products, subTotal, shippmentPrice,
    totalPrice, paymentMethod, observations, receipt,
  }: Sales) {
    this.stockId = stockId;
    this.createdBy = createdBy;
    this.clientId = clientId;
    this.products = products;
    this.subTotal = subTotal;
    this.shippmentPrice = shippmentPrice;
    this.totalPrice = totalPrice;
    this.paymentMethod = paymentMethod;
    this.observations = observations || '';
    this.receipt = receipt;
  }
}

export default Sales;
