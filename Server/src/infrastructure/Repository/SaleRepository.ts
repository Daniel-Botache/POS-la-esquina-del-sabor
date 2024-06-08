import { SaleInstance } from "../../domain/models/SaleAttributes";
import { Sale } from "../config/database";
import { Product, Bale } from "../config/database";
import { ISaleRepository } from "../../application/repositories/ISaleRepository";
import { ProductInstance } from "../../domain/models/ProductAttributes";
import { BaleInstance } from "../../domain/models/BaleAttributes";
const { Op } = require("sequelize");

export class SaleRepository implements ISaleRepository {
  public async findAll(): Promise<SaleInstance[]> {
    const salesData = await Sale.findAll({
      include: [
        {
          model: Product,
          as: "products",
        },
        {
          model: Bale,
          as: "bales",
        },
      ],
    });
    return salesData.map((sale) => sale as SaleInstance);
  }

  public async findById(id: string): Promise<SaleInstance | null> {
    const saleData = await Sale.findByPk(id, {
      include: [
        {
          model: Product,
          as: "products",
        },
        {
          model: Bale,
          as: "bales",
        },
      ],
    });
    return saleData as SaleInstance;
  }
  public async create(data: any): Promise<boolean> {
    try {
      const {
        paymentType,
        movementType,
        total,
        clientId,
        credit,
        userId,
        valueTransaction,
        valueCash,
      } = data;
      const products = data.products;
      const bales = data.bales;
      const created = (await Sale.create(
        {
          paymentType,
          movementType,
          total,
          clientId,
          credit,
          userId,
          valueTransaction,
          valueCash,
        },
        {
          include: [
            { model: Product, as: "products" },
            { model: Bale, as: "bales" },
          ],
        }
      )) as SaleInstance;

      if (products && products.length > 0 && created && created.addProducts) {
        const productsToAssociate = (await Product.findAll({
          where: { id: products },
        })) as ProductInstance[];

        if (productsToAssociate.length > 0) {
          await created.addProducts(productsToAssociate);
        }
      }
      if (bales && bales.length > 0 && created && created.addBales) {
        const balesToAssociate = (await Bale.findAll({
          where: { id: bales },
        })) as BaleInstance[];

        if (balesToAssociate.length > 0) {
          await created.addBales(balesToAssociate);
        }
      }
      return true;
    } catch (error) {
      console.error("Failed to create sale with products:", error);
      return false;
    }
  }

  public async delete(id: number): Promise<boolean> {
    const data = await Sale.destroy({ where: { id } });
    return !data;
  }
  public async findByDateNow(): Promise<SaleInstance[]> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const data = await Sale.findAll({
      where: {
        createdAt: {
          [Op.gte]: startOfDay,
          [Op.lte]: endOfDay,
        },
      },
      include: [
        {
          model: Product,
          as: "products",
        },
      ],
    });

    return data.map((sale) => sale as SaleInstance);
  }

  public async findByDate(
    since: string,
    until: string
  ): Promise<SaleInstance[]> {
    const startOfDay = new Date(since);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(until);
    endOfDay.setHours(23, 59, 59, 999);
    const data = await Sale.findAll({
      where: {
        createdAt: {
          [Op.gte]: startOfDay,
          [Op.lte]: endOfDay,
        },
      },
      include: [
        {
          model: Product,
          as: "products",
        },
      ],
    });

    return data.map((sale) => sale as SaleInstance);
  }
}
