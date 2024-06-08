import { SaleRepository } from "../Repository/SaleRepository";
import { Request, Response } from "express";
import { DefaultController } from "./defaultController";
import { sequelize } from "../config/database";

export class SaleController extends DefaultController {
  private saleRepository: SaleRepository;
  constructor() {
    super(sequelize.models.Sale);
    this.saleRepository = new SaleRepository();
  }
  findSaleById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await this.saleRepository.findById(id);
      if (data) {
        return res.status(200).json(data);
      }
      return res.status(404).send("No se encuentran datos");
    } catch (error) {
      const err = error as Error;
      return res.status(500).send(err.message);
    }
  };
  createSale = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      console.log(data);
      const createdData = await this.saleRepository.create(data);
      if (!createdData)
        return res
          .status(400)
          .json({ message: "Data ya existe", succes: createdData });
      else
        return res
          .status(200)
          .json({ message: "Data creada exitosamente", succes: createdData });
    } catch (error) {
      const err = error as Error;
      return res.status(500).send(err.message);
    }
  };
  findAllSales = async (_req: Request, res: Response) => {
    try {
      const salesData = await this.saleRepository.findAll();
      if (salesData.length > 0) {
        return res
          .status(200)
          .json({ success: salesData, message: "Datos encontrados" });
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
      const saleData = await this.saleRepository.findByDateNow();
      if (saleData.length > 0) {
        return res
          .status(200)
          .json({ success: saleData, message: "Datos encontrados" });
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
