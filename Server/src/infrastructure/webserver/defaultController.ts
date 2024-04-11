import { Request, Response } from "express";
import { defaultRepository } from "../repository/DefaultRepository";

export class defaultController extends defaultRepository {
  getAllClients = async (_req: Request, res: Response) => {
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
}
