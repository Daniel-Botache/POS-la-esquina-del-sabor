import { UserRepository } from "../repository/UserRepository";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../config/models/User";

export class UserController {
  private userRespository: UserRepository;
  constructor() {
    this.userRespository = new UserRepository();
  }

  getAllUsers = async (_req: Request, res: Response) => {
    try {
      const users = await this.userRespository.findAll();
      if (users.length > 0) {
        return res
          .status(200)
          .json({ succes: users, message: "Usuarios encontrados" });
      }
      return res
        .status(404)
        .json({ succes: users, message: "Usuarios no encontrados" });
    } catch (error) {
      const err = error as Error;
      return res.status(500).send(err.message);
    }
  };
}
