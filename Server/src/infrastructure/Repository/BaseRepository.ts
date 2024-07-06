import { Base } from "../config/database";

import { IBaseRepository } from "../../application/repositories/IBaseRepository";

import { BaseInstance } from "../../domain/models/BaseAttributes";

const { Op } = require("sequelize");

export class BaseRepository implements IBaseRepository {
  public async findByDate(
    until: string,
    since: string
  ): Promise<BaseInstance[]> {
    const startOfDay = new Date(until).toISOString();
    const parseDateInitial = Date.parse(startOfDay) + 86400000;
    const startOfDayChanged = new Date(parseDateInitial);
    startOfDayChanged.setHours(0, 0, 0, 0);
    const endOfDay = new Date(since).toISOString();
    const parseDateFinal = Date.parse(endOfDay) + 86400000;
    const finalOfDayChanged = new Date(parseDateFinal);
    finalOfDayChanged.setHours(23, 59, 59, 999);
    console.log(endOfDay);
    const data = await Base.findAll({
      where: {
        date: {
          [Op.gte]: startOfDayChanged,
          [Op.lte]: finalOfDayChanged,
        },
      },
    });

    return data.map((base) => base as BaseInstance);
  }
  public async findByDateNow(): Promise<BaseInstance[]> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const data = await Base.findAll({
      where: {
        date: {
          [Op.gte]: startOfDay,
          [Op.lte]: endOfDay,
        },
      },
    });

    return data.map((base) => base as BaseInstance);
  }
}
