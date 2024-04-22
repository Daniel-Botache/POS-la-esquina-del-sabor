import { ISuplierRepository } from "../../application/repositories/ISuplierRepository";
import { SuplierInstance } from "../../domain/models/SuplierAttributes";
import { Suplier } from "../config/database";
import { Product } from "../config/database";

export class SuplierRepository implements ISuplierRepository {
  public async findById(id: string): Promise<SuplierInstance | null> {
    const data = await Suplier.findByPk(id, {
      include: [{ model: Product, as: "products" }],
    });
    return data as SuplierInstance;
  }
}
