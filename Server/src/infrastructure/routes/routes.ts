// src/infrastructure/webserver/clienteRoutes.ts
import { Router } from "express";
//import { ClientController } from "../webserver/clientController";
import { defaultController } from "../webserver/defaultController";
import { sequelize } from "../config/database";

const router = Router();
//const controllers = new ClientController();
const controller = new defaultController(sequelize.models.Client);

router.get("/", controller.getAllData);
router.get("/:id", controller.getDataById);
router.post("/", controller.createData);
router.put("/:id", controller.putData);
router.delete("/:id", controller.deleteData);

export const clienteRoutes = router;
