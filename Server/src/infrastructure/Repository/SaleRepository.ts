import { SaleInstance } from "../../domain/models/SaleAttributes";
import { Sale } from "../config/database";
import { Product } from "../config/database";
import { ISaleRepository } from "../../application/repositories/ISaleRepository";
import { ProductInstance } from "../../domain/models/ProductAttributes";

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
  public async create(data: any): Promise<boolean> {
    try {
      const { paymentType, movementType, total, clientId, credit } = data;
      const products = data.products;
      const created = (await Sale.create(
        {
          paymentType,
          movementType,
          total,
          clientId,
          credit,
        },
        {
          include: [{ model: Product, as: "products" }], // Esto incluye el modelo durante la creación si es necesario
        }
      )) as SaleInstance;

      if (products && products.length > 0 && created && created.addProducts) {
        const productsToAssociate = (await Product.findAll({
          where: { id: products },
        })) as ProductInstance[];

        if (productsToAssociate.length > 0) {
          await created.addProducts(productsToAssociate);
        }
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
