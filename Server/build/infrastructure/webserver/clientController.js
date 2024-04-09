"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const ClientRepository_1 = require("../Repository/ClientRepository");
class ClientController {
    constructor() {
        this.getAllClientes = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const clientes = yield this.clientRepository.findAll();
                res.json(clientes);
            }
            catch (error) {
                const err = error;
                res.status(500).send(err.message);
            }
        });
        this.createCliente = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const dataRequest = req.body;
                const createdCliente = yield this.clientRepository.create(dataRequest);
                res.json(createdCliente);
            }
            catch (error) {
                const err = error;
                res.status(500).send(err.message);
            }
        });
        this.clientRepository = new ClientRepository_1.ClientRepository();
    }
}
exports.ClientController = ClientController;
