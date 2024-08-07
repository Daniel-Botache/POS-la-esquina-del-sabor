import { sequelize } from "../config/database";
import { SuplierRepository } from "../Repository/SuplierRepository";
import { DefaultController } from "./defaultController";
import { Request, Response } from "express";

export class SuplierController extends DefaultController {
  private suplierRepository: SuplierRepository;
  constructor() {
    super(sequelize.models.Suplier);
    this.suplierRepository = new SuplierRepository();
  }
  findSuplierById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const suplierData = await this.suplierRepository.findById(id);
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
  findProductByName = async (req: Request, res: Response) => {
    try {
      const { name } = req.query;

      if (name) {
        const stringName = name.toString();
        const lowerCaseName = stringName.toLowerCase();
        const suppliers = await this.suplierRepository.findByName(
          lowerCaseName
        );
        if (!suppliers || suppliers.length === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Datos no encontrados" });
        }
        return res
          .status(200)
          .json({ success: suppliers, message: "Datos encontrados" });
      }
      return res.status(400).json({
        success: false,
        message: "Falta el parámetro 'name' en la consulta",
      });
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ success: false, message: err.message });
    }
  };
}
