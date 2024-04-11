import { ModelDefined } from "sequelize";
import { sequelize } from "../config/database";

export class defaultRepository {
  public model: ModelDefined<any, any>;

  constructor(model: ModelDefined<any, any>) {
    this.model = model;
  }

  public async getAll() {
    const data = await this.model.findAll();
    return data;
  }

  public async create(data: any) {
    let whereCondition;
    if (this.model === sequelize.models.Client) {
      whereCondition = { cedula: data.cedula };
    } else {
      whereCondition = data;
    }
    const [_res, created] = await this.model.findOrCreate({
      where: whereCondition,
      defaults: data,
    });
    return !created;
  }
}
