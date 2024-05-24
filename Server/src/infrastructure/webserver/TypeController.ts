import { sequelize } from "../config/database";
import { TypeRepository } from "../repository/TypeRepository";
import { DefaultController } from "./defaultController";
import { Request, Response } from "express";

export class TypeController extends DefaultController {
  private typeRepository: TypeRepository;
  constructor() {
    super(sequelize.models.Type);
    this.typeRepository = new TypeRepository();
  }
  findSuplierById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const typeData = await this.typeRepository.findById(id);
      if (typeData) {
        return res
          .status(200)
          .json({ success: typeData, message: "Datos encontrados" });
      }
      return res
        .status(404)
        .json({ success: typeData, message: "Datos no encontrados" });
    } catch (error) {
      const err = error as Error;
      return res.status(500).send(err.message);
    }
  };
}
