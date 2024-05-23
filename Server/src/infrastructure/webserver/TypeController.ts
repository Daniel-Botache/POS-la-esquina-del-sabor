import { sequelize } from "../config/database";
import { TypeRepository } from "../repository/TypeRepository";
import { DefaultController } from "./DefaultController";
import { Request, Response } from "express";

export class SuplierController extends DefaultController {
  private typeRepository: TypeRepository;
  constructor() {
    super(sequelize.models.Suplier);
    this.typeRepository = new TypeRepository();
  }
  findSuplierById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const suplierData = await this.typeRepository.findById(id);
      if (suplierData) {
        return res
          .status(200)
          .json({ success: suplierData, message: "Datos encontrados" });
      }
      return res
        .status(404)
        .json({ success: suplierData, message: "Datos no encontrados" });
    } catch (error) {
      const err = error as Error;
      return res.status(500).send(err.message);
    }
  };
}
