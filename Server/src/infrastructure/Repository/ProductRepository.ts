import { ProductInstance } from "../../domain/models/ProductAttributes";
import { Product, Suplier } from "../config/database";
import { IProductRepository } from "../../application/repositories/IProductRepository";
import { SuplierInstance } from "../../domain/models/SuplierAttributes";

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
  public async findAll(): Promise<ProductInstance[]> {
    const productsData = await Product.findAll({
      include: [
        {
          model: Suplier,
          as: "supliers",
        },
      ],
    });
    return productsData.map((product) => product as ProductInstance);
  }
  public async create(data: any): Promise<boolean> {
    try {
      const { name, type, volume, maximum, barCode, price, spent, supliers } =
        data;
      const [productInstance, created] = (await Product.findOrCreate({
        where: { barCode },
        defaults: {
          name,
          type,
          volume,
          maximum,
          price,
          spent,
        },
      })) as [ProductInstance, boolean];

      if (
        supliers &&
        supliers.length > 0 &&
        productInstance &&
        productInstance.addSupliers
      ) {
        const suppliersToAssociate = (await Suplier.findAll({
          where: { id: supliers },
        })) as SuplierInstance[];

        if (suppliersToAssociate.length > 0) {
          await productInstance.addSupliers(suppliersToAssociate);
        }
      }

      return created;
    } catch (error) {
      console.error("Failed to create product with suppliers:", error);
      return false;
    }
  }
  public async update(id: string, data: any): Promise<boolean> {
    const productData = await this.findById(id);
    if (productData) {
      productData.update(data);
      return true;
    }
    return false;
  }
}
