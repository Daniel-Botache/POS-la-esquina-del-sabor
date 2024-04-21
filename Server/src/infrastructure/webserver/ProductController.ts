import { ProductRepository } from "../repository/ProductRepository";
import { Request, Response } from "express";
import { DefaultController } from "./DefaultController";
import { sequelize } from "../config/database";

export class ProductController extends DefaultController {}
