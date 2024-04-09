"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const DB_BASE = process.env.DB_BASE;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
let sequelize;
//New instance of sequalize if .env data exist
if (DB_BASE && DB_USER && DB_HOST && DB_PASSWORD) {
    exports.sequelize = sequelize = new sequelize_1.Sequelize(DB_BASE, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: "postgres",
        logging: false,
        native: false,
    });
    //take the route of this file
    const basename = path_1.default.basename(__filename);
    const modelDefiners = [];
    //filter and take all models from dir "models" with fs module
    fs_1.default.readdirSync(path_1.default.join(__dirname, "/models"))
        .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts")
        .forEach((file) => {
        modelDefiners.push(require(path_1.default.join(__dirname, "/models", file)).default);
    });
    //define Models
    modelDefiners.forEach((model) => model(sequelize));
}
else {
    throw new Error("Missing database connection details");
}
const { Client } = sequelize.models;
exports.Client = Client;
