import morgan from "morgan";
import { clienteRoutes } from "../routes/routes";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const app = express();

//Json parser
app.use(express.json());
app.use(cookieParser());

//request logs on console
app.use(morgan("dev"));

//Cors config
app.use(cors(corsOptions));

app.use("/", clienteRoutes);

export { app };
