import { UserRepository } from "../Repository/UserRepository";
import { Request, Response } from "express";
import { sequelize } from "../config/database";
import bcrypt from "bcrypt";
//import User from "../config/models/User";
import { DefaultController } from "./DefaultController";
import { UserInstance } from "../../domain/models/UserAttributes";

export class UserController extends DefaultController {
  private userRespository: UserRepository;
  constructor() {
    super(sequelize.models.User);
    this.userRespository = new UserRepository();
  }
  createUserData = async (req: Request, res: Response) => {
    try {
      const saltRounds = 10;
      const userData = req.body as UserInstance;
      if (
        !userData.user ||
        !userData.password ||
        userData.admin === undefined
      ) {
        return res
          .status(400)
          .json({ success: false, message: "Datos de usuario incompletos" });
      }
      const password = userData.password;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const user = {
        user: userData.user,
        password: passwordHash,
        admin: userData.admin,
      } as UserInstance;

      const created = await this.userRespository.create(user);
      console.log(userData);
      if (created)
        return res
          .status(200)
          .json({ succes: created, message: "Data creada exitosamente" });
      return res
        .status(404)
        .json({ succes: created, message: "Data ya existe" });
    } catch (error) {
      const err = error as Error;
      return res.status(500).send(err.message);
    }
  };

  putData = async (req: Request, res: Response) => {
    try {
      const saltRounds = 10;
      const { id } = req.params;
      const dataRequest = req.body as UserInstance;
      const password = dataRequest.password;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const user = {
        user: dataRequest.user,
        password: passwordHash,
        admin: dataRequest.admin,
        ban: dataRequest.ban,
      } as UserInstance;
      const update = await this.userRespository.update(id, user);
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
  login = async (req: Request, res: Response) => {
    try {
      const { user, password } = req.body;
      if (!user || !password)
        return res.status(400).json({ message: "Faltan datos", access: false });
      const log = await this.userRespository.login(user);
      if (!log || log.ban === true) {
        return res
          .status(400)
          .json({ access: false, message: "Usuario no encontrado" });
      }
      const username = log.user;
      const userId = log.id;
      const passwordMatch = await bcrypt.compare(password, log.password);
      if (!passwordMatch) {
        return res
          .status(403)
          .json({ access: false, message: "Contaseña incorrecta" });
      }
      if (log.admin == true)
        return res
          .status(200)
          .json({ access: true, admin: true, id: userId, user: username });
      return res
        .status(200)
        .json({ access: true, admin: false, id: userId, user: username });
    } catch (error) {
      const err = error as Error;
      return res.status(500).send(err.message);
    }
  };
}
