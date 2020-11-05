class StockTransactions {
  stockId: string;

  quantity: unknown;

  type: string;

  productId: string;

  constructor({
    stockId, quantity, type, productId,
  }: StockTransactions) {
    this.stockId = stockId;
    this.quantity = quantity;
    this.type = type;
    this.productId = productId;
  }
}

export default StockTransactions;
