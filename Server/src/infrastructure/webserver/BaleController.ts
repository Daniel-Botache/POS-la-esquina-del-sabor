import { BaleRepository } from "../repository/BaleRepository";
import { Request, Response } from "express";
import { DefaultController } from "./defaultController";
import { sequelize } from "../config/database";

export class BaleController extends DefaultController {
  private baleRepository: BaleRepository;
  constructor() {
    super(sequelize.models.Bale);
    this.baleRepository = new BaleRepository();
  }

  findProductByBarcode = async (req: Request, res: Response) => {
    try {
      const { barcode } = req.params;

      if (barcode) {
        const product = await this.baleRepository.findByBarCode(barcode);
        if (!product) {
          return res
            .status(404)
            .json({ success: false, message: "Datos no encontrados" });
        }
        return res
          .status(200)
          .json({ success: product, message: "Datos encontrados" });
      }
      return res.status(400).json({
        success: false,
        message: "Falta el parámetro 'barcode' en la consulta",
      });
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ success: false, message: err.message });
    }
  };
  findProductByName = async (req: Request, res: Response) => {
    try {
      const { name } = req.query;

      if (name) {
        const stringName = name.toString();
        const lowerCaseName = stringName.toLowerCase();
        const products = await this.baleRepository.findByName(lowerCaseName);
        if (!products || products.length === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Datos no encontrados" });
        }
        return res
          .status(200)
          .json({ success: products, message: "Datos encontrados" });
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
