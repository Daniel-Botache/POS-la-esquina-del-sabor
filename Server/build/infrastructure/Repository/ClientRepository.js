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
exports.ClientRepository = void 0;
const database_1 = require("../config/database");
class ClientRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const clientes = yield database_1.Client.findAll();
            return clientes.map((c) => c.toJSON());
        });
    }
    findById(cedula) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = yield database_1.Client.findByPk(cedula);
            return cliente ? cliente.toJSON() : null;
        });
    }
    create(client) {
        return __awaiter(this, void 0, void 0, function* () {
            // Crear un objeto que coincida con las columnas de la tabla Client
            const { id, cedula, name, tel, address, ban, dateIn } = client;
            const createdCliente = yield database_1.Client.create({
                id,
                cedula,
                name,
                tel,
                address,
                ban,
                dateIn,
            });
            return createdCliente.toJSON();
        });
    }
    update(cedula, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.Client.update(client, { where: { cedula } });
        });
    }
    delete(cedula) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.Client.destroy({ where: { cedula } });
        });
    }
}
exports.ClientRepository = ClientRepository;
