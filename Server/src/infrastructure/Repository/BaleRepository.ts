import { IBaleRepository } from "../../application/repositories/IBaleRepository";
import { BaleInstance } from "../../domain/models/BaleAttributes";
import { Bale } from "../config/database";
const { Op } = require("sequelize");

export class BaleRepository implements IBaleRepository {
  public async findByBarCode(barCode: string): Promise<BaleInstance> {
    const product = await Bale.findOne({
      where: {
        barCode: barCode,
      },
    });
    return product as BaleInstance;
  }
  public async findByName(name: string): Promise<BaleInstance[]> {
    const products = await Bale.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    return products.map((product) => product as BaleInstance);
  }
}
