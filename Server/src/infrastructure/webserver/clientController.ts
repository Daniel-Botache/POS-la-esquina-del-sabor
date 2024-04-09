import { Request, Response } from "express";
import { ClientRepository } from "../Repository/ClientRepository";

export class ClientController {
  private clientRepository: ClientRepository;

  constructor() {
    this.clientRepository = new ClientRepository();
  }

  getAllClientes = async (_req: Request, res: Response) => {
    try {
      const clientes = await this.clientRepository.findAll();
      res.json(clientes);
    } catch (error) {
      const err = error as Error;
      res.status(500).send(err.message);
    }
  };
  createCliente = async (req: Request, res: Response) => {
    try {
      const dataRequest = req.body;
      const createdCliente = await this.clientRepository.create(dataRequest);
      res.json(createdCliente);
    } catch (error) {
      const err = error as Error;
      res.status(500).send(err.message);
    }
  };
}
