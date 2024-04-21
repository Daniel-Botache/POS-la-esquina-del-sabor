import { ProductInstance } from "../../domain/models/ProductAttributes";
import { Product, Suplier } from "../config/database";
import { IProductRepository } from "../../application/repositories/IProductRepository";

export class ProductRepository implements IProductRepository {
  public async findById(id: string): Promise<ProductInstance | null> {
    const productData = await Product.findByPk(id, {
      include: [
        {
          model: Suplier,
          as: "supliers",
        },
      ],
    });
    return productData as ProductInstance;
  }
}
