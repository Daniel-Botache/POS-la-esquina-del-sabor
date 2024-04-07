import { Sequelize } from "sequelize-typescript";

const DB_BASE: string | undefined = process.env.DB_BASE;
const DB_USER: string | undefined = process.env.DB_USER;
const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD;
const DB_HOST: string | undefined = process.env.DB_HOST;

const sequelize = new Sequelize({
  database: DB_BASE,
  dialect: "postgres",
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  models: [__dirname + "/../models/*.ts"],
});

export default sequelize;
