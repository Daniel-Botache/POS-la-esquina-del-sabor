import { BaleRepository } from "../repository/BaleRepository";
import { Request, Response } from "express";
import { DefaultController } from "./DefaultController";
import { sequelize } from "../config/database";

export class BaleController extends DefaultController {
  private baleRepository: BaleRepository;
  constructor() {
    super(sequelize.models.Product);
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
}
