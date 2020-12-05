import Products from '../models/Products';
import Product from '../schemas/Product';

interface UpdateProduct {
  productId: string;
  name?: string;
  price?: number;
}

class ProductsRepository {
  public async all(): Promise<Products[]> {
    const products = await Product.find({});
    const productsObj: Products[] = products.map((product) => {
      const p: Products = product.toObject();
      return p;
    });
    return productsObj;
  }

  public async update({ productId, name, price }: UpdateProduct): Promise<Products> {
    try {
      const productBeforeUpdate = await Product.findById(productId);

      const newProduct = await Product.findOneAndUpdate({ _id: productId }, {
        $set: {
          name: name || productBeforeUpdate?.toObject().name,
          price: price || productBeforeUpdate?.toObject().price,
        },
      }, { new: true });
      return newProduct?.toObject();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async create({ name, price }: Products): Promise<Products> {
    const product = new Products({ name, price });

    try {
      const newProduct = await new Product(product).save();
      return newProduct?.toObject();
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
