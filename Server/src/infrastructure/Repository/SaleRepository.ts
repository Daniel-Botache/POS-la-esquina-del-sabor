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
  create(data: SaleInstance): Promise<boolean> {}
  delete(id: number): Promise<boolean> {}
}
