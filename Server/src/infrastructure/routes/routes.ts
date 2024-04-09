// src/infrastructure/webserver/clienteRoutes.ts
import { Router } from "express";
import { ClientController } from "../webserver/clientController";

const router = Router();
const controller = new ClientController();

router.get("/", controller.getAllClients);
//router.get("/:id", controller.getClienteById);
router.post("/", controller.createClient);
//router.put("/:id", controller.updateCliente);
//router.delete("/:id", controller.deleteCliente);

export const clienteRoutes = router;
