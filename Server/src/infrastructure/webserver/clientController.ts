import { Request, Response } from "express";
import { ClientRepository } from "../Repository/ClientRepository";

export class ClientController {
  private clientRepository: ClientRepository;

  constructor() {
    this.clientRepository = new ClientRepository();
  }

  getAllClients = async (_req: Request, res: Response) => {
    try {
      const clients = await this.clientRepository.findAll();
      res.status(200).json(clients);
    } catch (error) {
      const err = error as Error;
      res.status(500).send(err.message);
    }
  };
  createClient = async (req: Request, res: Response) => {
    try {
      const dataRequest = req.body;
      const createdClient = await this.clientRepository.create(dataRequest);
      res.status(200).json(createdClient);
    } catch (error) {
      const err = error as Error;
      res.status(500).send(err.message);
    }
  };
}
