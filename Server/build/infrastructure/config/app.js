"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("../routes/routes");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};
const app = (0, express_1.default)();
exports.app = app;
//Json parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//request logs on console
app.use((0, morgan_1.default)("dev"));
//Cors config
app.use((0, cors_1.default)(corsOptions));
app.use("/", routes_1.clienteRoutes);
