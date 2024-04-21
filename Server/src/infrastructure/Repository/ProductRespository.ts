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
      const { name, type, volume, maximum, barCode, price, spent } = data;
      const supliers = data.supliers;
      const created = await Product.create(
        {
          name,
          type,
          volume,
          maximum,
          barCode,
          price,
          spent,
        },
        {
          include: [{ model: Suplier, as: "supliers" }], // Esto incluye el modelo durante la creación si es necesario
        }
      );

      if (supliers) {
        created.set("supliers", supliers); // Asegúrate de que data.products es un array de IDs o instancias de Product
      }

      return true;
    } catch (error) {
      console.error("Failed to create sale with products:", error);
      return false;
    }
  }
}
