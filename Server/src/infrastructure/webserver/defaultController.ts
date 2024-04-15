import { Request, Response } from "express";
import { DefaultRepository } from "../repository/DefaultRepository";

export class DefaultController extends DefaultRepository {
  getAllData = async (_req: Request, res: Response) => {
    try {
      const data = await this.getAll();
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).send(err.message);
    }
  };
  createData = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const createdData = await this.create(data);
      if (createdData) return res.status(400).send("Data ya existe");
      else return res.status(200).send("Data creada");
    } catch (error) {
      const err = error as Error;
      return res.status(500).send(err.message);
    }
  };
  getDataById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await this.getById(id);
      if (data) {
        return res.status(200).json(data);
      }
      return res.status(404).send("No se encuentran datos");
    } catch (error) {
      const err = error as Error;
      return res.status(500).send(err.message);
    }
  };
  deleteData = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await this.delete(id);
      if (data) {
        return res.status(200).send(true);
      }
      return res.status(404).send("Datos no encontrados");
    } catch (error) {
      const err = error as Error;
      return res.status(500).send(err.message);
    }
  };
  putData = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const dataRequest = req.body;
      const update = await this.put(id, dataRequest);
      if (update) {
        return res
          .status(200)
          .json({ succes: true, message: "Datos actualizados correctamente" });
      }
      return res
        .status(404)
        .send({ succes: false, message: "Datos no encontrados" });
    } catch (error) {
      const err = error as Error;
      return res.status(500).send(err.message);
    }
  };
}
