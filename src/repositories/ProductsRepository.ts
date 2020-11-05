import Products from '../models/Products';
import Product from '../schemas/Product';

interface UpdateProduct {
  productId: string;
  name?: string;
  price?: number;
}

class ProductsRepository {
  public async all(): Promise<unknown> {
    const products = await Product.find({});

    return products;
  }

  public async update({ productId, name, price }: UpdateProduct): Promise<unknown> {
    try {
      const productBeforeUpdate = await Product.findById(productId);

      return await Product.findOneAndUpdate({ _id: productId }, {
        $set: {
          name: name || productBeforeUpdate?.toObject().name,
          price: price || productBeforeUpdate?.toObject().price,
        },
      }, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async create({ name, price }: Products): Promise<unknown> {
    const product = new Products({ name, price });

    try {
      return await new Product(product).save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async delete(id: string): Promise<boolean> {
    const exists = await Product.findById(id);
    if (!exists) {
      throw new Error('Este produto não existe.');
    }

    await Product.deleteOne({ _id: id });

    return true;
  }
}

export default ProductsRepository;
