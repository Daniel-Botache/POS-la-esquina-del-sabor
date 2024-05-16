import { IBaleRepository } from "../../application/repositories/IBaleRepository";
import { BaleInstance } from "../../domain/models/BaleAttributes";
import { Bale } from "../config/database";

export class BaleRepository implements IBaleRepository {
  public async findByBarCode(barCode: string): Promise<BaleInstance> {
    const product = await Bale.findOne({
      where: {
        barCode: barCode,
      },
    });
    return product as BaleInstance;
  }
}
