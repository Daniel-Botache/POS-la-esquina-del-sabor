import { ModelDefined } from "sequelize";
import { sequelize } from "../config/database";

export class DefaultRepository {
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
      whereCondition = { id: data.id };
    } else {
      whereCondition = data;
    }
    const [_res, created] = await this.model.findOrCreate({
      where: whereCondition,
      defaults: data,
    });
    return created;
  }
  public async getById(id: string) {
    const data = await this.model.findByPk(id);
    return data;
  }
  public async delete(id: string) {
    const data = await this.model.destroy({ where: { id } });
    return data;
  }
  public async put(id: string, data: any) {
    const cell = await this.getById(id);
    if (cell) {
      cell.update(data);
      return true;
    }
    return false;
  }
}
