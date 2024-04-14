import { Request, Response } from "express";
import { defaultRepository } from "../repository/DefaultRepository";

export class defaultController extends defaultRepository {
  getAllData = async (_req: Request, res: Response) => {
    try {
      const data = await this.getAll();
      res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      res.status(500).send(err.message);
    }
  };
  createData = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const createdData = await this.create(data);
      if (createdData) res.status(400).send("Data ya existe");
      else res.status(200).send("Data creada");
    } catch (error) {
      const err = error as Error;
      res.status(500).send(err.message);
    }
  };
  getDataById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await this.getById(id);
      if (data) {
        res.status(200).json(data);
      }
      res.status(404).send("No se encuentran datos");
    } catch (error) {
      const err = error as Error;
      res.status(500).send(err.message);
    }
  };
}
