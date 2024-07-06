import { sequelize } from "../config/database";
import { DefaultController } from "./defaultController";
import { Request, Response } from "express";
import { BaseRepository } from "../Repository/BaseRepository";

export class BaseController extends DefaultController {
  private expenseRepository: BaseRepository;
  constructor() {
    super(sequelize.models.Base);
    this.expenseRepository = new BaseRepository();
  }

  findSBaseByDate = async (req: Request, res: Response) => {
    const since = req.body.since;
    const until = req.body.until;
    console.log(since, until);
    try {
      const baseData = await this.expenseRepository.findByDate(since, until);
      if (baseData.length > 0) {
        return res
          .status(200)
          .json({ success: baseData, message: "Datos encontrados" });
      }
      return res
        .status(404)
        .json({ success: false, message: "Datos no encontrados" });
    } catch (error) {
      const err = error as Error;
      return res.status(500).send(err.message);
    }
  };
  findBaseDateNow = async (_req: Request, res: Response) => {
    try {
      const baseData = await this.expenseRepository.findByDateNow();
      if (baseData.length > 0) {
        return res
          .status(200)
          .json({ success: baseData, message: "Datos encontrados" });
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
