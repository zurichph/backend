class Sales {
  stockId: string;

  clientId: string;

  products: Record<string, unknown>;

  subTotal: number;

  shippmentPrice: number;

  totalPrice: number;

  paymentMethod: string;

  observations: string;

  receipt: string;

  cancelled: boolean;

  constructor({
    stockId, clientId, products, subTotal, shippmentPrice,
    totalPrice, paymentMethod, observations, receipt, cancelled,
  }: Sales) {
    this.stockId = stockId;
    this.clientId = clientId;
    this.products = products;
    this.subTotal = subTotal;
    this.shippmentPrice = shippmentPrice;
    this.totalPrice = totalPrice;
    this.paymentMethod = paymentMethod;
    this.observations = observations;
    this.receipt = receipt;
    this.cancelled = cancelled;
  }
}

export default Sales;
