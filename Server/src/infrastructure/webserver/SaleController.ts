import { SaleRepository } from "../repository/SaleRepository";
import { Request, Response } from "express";
import { DefaultController } from "./DefaultController";
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
}
