import { ModelDefined, Sequelize } from "sequelize";
import fs from "fs";
import path from "path";
import "dotenv/config";

const DB_BASE: string | undefined = process.env.DB_BASE;
const DB_USER: string | undefined = process.env.DB_USER;
const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD;
const DB_HOST: string | undefined = process.env.DB_HOST;

let sequelize: Sequelize;
//New instance of sequalize if .env data exist
if (DB_BASE && DB_USER && DB_HOST && DB_PASSWORD) {
  sequelize = new Sequelize(DB_BASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres",
    logging: false,
    native: false,
  });
  //take the route of this file
  const basename: string = path.basename(__filename);
  const modelDefiners: ((sequelize: Sequelize) => ModelDefined<any, any>)[] =
    [];

  //filter and take all models from dir "models" with fs module
  fs.readdirSync(path.join(__dirname, "/models"))
    .filter(
      (file) =>
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    )
    .forEach((file) => {
      modelDefiners.push(
        require(path.join(__dirname, "/models", file)).default
      );
    });
  //define Models
  modelDefiners.forEach((model) => model(sequelize));
} else {
  throw new Error("Missing database connection details");
}
const { Client } = sequelize.models;

export { sequelize, Client };
