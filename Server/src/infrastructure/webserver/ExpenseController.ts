import { sequelize } from "../config/database";
import { DefaultController } from "./defaultController";
import { Request, Response } from "express";
import { ExpenseRepository } from "../Repository/ExpenseRepository";

export class ExpenseController extends DefaultController {
  private expenseRepository: ExpenseRepository;
  constructor() {
    super(sequelize.models.Expense);
    this.expenseRepository = new ExpenseRepository();
  }

  findSaleByDate = async (req: Request, res: Response) => {
    const since = req.body.since;
    const until = req.body.until;
    console.log(since, until);
    try {
      const expenseData = await this.expenseRepository.findByDate(since, until);
      if (expenseData.length > 0) {
        return res
          .status(200)
          .json({ success: expenseData, message: "Datos encontrados" });
      }
      return res
        .status(404)
        .json({ success: false, message: "Datos no encontrados" });
    } catch (error) {
      const err = error as Error;
      return res.status(500).send(err.message);
    }
  };
  findSaleByDateNow = async (_req: Request, res: Response) => {
    try {
      const expenseData = await this.expenseRepository.findByDateNow();
      if (expenseData.length > 0) {
        return res
          .status(200)
          .json({ success: expenseData, message: "Datos encontrados" });
      }
      return res
        .status(404)
        .json({ success: false, message: "Datos no encontrados" });
    } catch (error) {
      const err = error as Error;
      return res.status(500).send(err.message);
    }
  };
}
