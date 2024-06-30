import { Expense } from "../config/database";

import { IExpenseRepository } from "../../application/repositories/IExpenseRepository";

import { ExpenseInstance } from "../../domain/models/ExpenseAttributes";

const { Op } = require("sequelize");

export class ExpenseRepository implements IExpenseRepository {
  public async findByDate(
    since: string,
    until: string
  ): Promise<ExpenseInstance[]> {
    const startOfDay = new Date(since).toISOString();

    const parseDateInitial = Date.parse(startOfDay) + 86400000;
    const startOfDayChanged = new Date(parseDateInitial);
    startOfDayChanged.setHours(0, 0, 0, 0);
    const endOfDay = new Date(until).toISOString();
    const parseDateFinal = Date.parse(endOfDay) + 86400000;
    const finalOfDayChanged = new Date(parseDateFinal);
    finalOfDayChanged.setHours(23, 59, 59, 999);
    console.log(endOfDay);
    const data = await Expense.findAll({
      where: {
        createdAt: {
          [Op.gte]: startOfDayChanged,
          [Op.lte]: finalOfDayChanged,
        },
      },
    });

    return data.map((expense) => expense as ExpenseInstance);
  }

  public async findByDateNow(): Promise<ExpenseInstance[]> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const data = await Expense.findAll({
      where: {
        createdAt: {
          [Op.gte]: startOfDay,
          [Op.lte]: endOfDay,
        },
      },
    });

    return data.map((expense) => expense as ExpenseInstance);
  }
}
