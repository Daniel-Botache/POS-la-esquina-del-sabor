import { ISuplierRepository } from "../../application/repositories/ISuplierRepository";
import { SuplierInstance } from "../../domain/models/SuplierAttributes";
import { Suplier } from "../config/database";
import { Product } from "../config/database";
import { Op } from "sequelize";

export class SuplierRepository implements ISuplierRepository {
  public async findById(id: string): Promise<SuplierInstance | null> {
    const data = await Suplier.findByPk(id, {
      include: [{ model: Product, as: "products" }],
    });
    return data as SuplierInstance;
  }
  public async findByName(name: string): Promise<SuplierInstance[]> {
    const suppliers = await Suplier.findAll({
      where: {
        company: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    return suppliers.map((supplier) => supplier as SuplierInstance);
  }
}
