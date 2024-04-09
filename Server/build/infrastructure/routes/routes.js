"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteRoutes = void 0;
// src/infrastructure/webserver/clienteRoutes.ts
const express_1 = require("express");
const clientController_1 = require("../webserver/clientController");
const router = (0, express_1.Router)();
const controller = new clientController_1.ClientController();
router.get("/", controller.getAllClientes);
//router.get("/:id", controller.getClienteById);
router.post("/", controller.createCliente);
//router.put("/:id", controller.updateCliente);
//router.delete("/:id", controller.deleteCliente);
exports.clienteRoutes = router;
