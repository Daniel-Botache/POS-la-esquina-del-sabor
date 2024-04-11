// src/infrastructure/webserver/clienteRoutes.ts
import { Router } from "express";
//import { ClientController } from "../webserver/clientController";
import { defaultController } from "../webserver/defaultController";
import { sequelize } from "../config/database";

const router = Router();
//const controllers = new ClientController();
const controller = new defaultController(sequelize.models.Client);

router.get("/", controller.getAllClients);
//router.get("/:id", controller.getClienteById);
router.post("/", controller.createData);
//router.put("/:id", controller.updateCliente);
//router.delete("/:id", controller.deleteCliente);

export const clienteRoutes = router;
