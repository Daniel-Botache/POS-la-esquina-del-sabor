import { SaleInstance } from "../../domain/models/SaleAttributes";
import { Sale } from "../config/database";
import { Product } from "../config/database";
import { ISaleRepository } from "../../application/repositories/ISaleRepository";

export class SaleRepository implements ISaleRepository {
  public async findById(id: string): Promise<SaleInstance | null> {
    const saleData = await Sale.findByPk(id, {
      include: [
        {
          model: Product,
          as: "products",
        },
      ],
    });
    return saleData as SaleInstance;
  }
  public async create(data: SaleInstance): Promise<boolean> {
    try {
      const products = data.products;
      const created = await Sale.create(
        {
          data,
        },
        {
          include: [{ model: Product, as: "products" }], // Esto incluye el modelo durante la creación si es necesario
        }
      );

      if (data.products) {
        created.set("products", products); // Asegúrate de que data.products es un array de IDs o instancias de Product
      }

      return true;
    } catch (error) {
      console.error("Failed to create sale with products:", error);
      return false;
    }
  }

  public async delete(id: number): Promise<boolean> {
    const data = await Sale.destroy({ where: { id } });
    return !data;
  }
}
