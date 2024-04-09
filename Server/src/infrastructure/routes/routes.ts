// src/infrastructure/webserver/clienteRoutes.ts
import { Router } from "express";
import { ClientController } from "../webserver/clientController";

const router = Router();
const controller = new ClientController();

router.get("/", controller.getAllClientes);
//router.get("/:id", controller.getClienteById);
router.post("/", controller.createCliente);
//router.put("/:id", controller.updateCliente);
//router.delete("/:id", controller.deleteCliente);

export const clienteRoutes = router;
