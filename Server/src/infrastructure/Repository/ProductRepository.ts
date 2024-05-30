import { ProductInstance } from "../../domain/models/ProductAttributes";
import { Product, Suplier, Bale } from "../config/database";
import { IProductRepository } from "../../application/repositories/IProductRepository";
import { SuplierInstance } from "../../domain/models/SuplierAttributes";
const { Op } = require("sequelize");

export class ProductRepository implements IProductRepository {
  public async findById(id: string): Promise<ProductInstance | null> {
    const productData = await Product.findByPk(id, {
      include: [
        {
          model: Suplier,
          as: "supliers",
        },
        {
          model: Bale,
          as: "bales", // Asegúrate de que 'as' coincida con cómo definiste la asociación en tu modelo
        },
      ],
    });
    return productData as ProductInstance;
  }
  public async findAll(): Promise<ProductInstance[]> {
    const productsData = await Product.findAll({
      include: [
        {
          model: Suplier,
          as: "supliers",
        },
      ],
    });
    return productsData.map((product) => product as ProductInstance);
  }
  public async create(data: any): Promise<boolean> {
    try {
      const {
        name,
        volume,
        maximum,
        barCode,
        price,
        spent,
        supliers,
        img,
        typeId,
      } = data;
      const created = (await Product.create({
        barCode,
        name,
        volume,
        maximum,
        price,
        spent,
        img,
        typeId,
      })) as ProductInstance;

      if (supliers && supliers.length > 0 && created && created.addSupliers) {
        const suppliersToAssociate = (await Suplier.findAll({
          where: { id: supliers },
        })) as SuplierInstance[];

        if (suppliersToAssociate.length > 0) {
          await created.addSupliers(suppliersToAssociate);
        }
      }

      return true;
    } catch (error) {
      console.error("Failed to create product with suppliers:", error);
      return false;
    }
  }
  public async update(id: string, data: any): Promise<boolean> {
    const productData = await this.findById(id);
    if (productData) {
      productData.update(data);
      return true;
    }
    return false;
  }

  public async findByName(name: string): Promise<ProductInstance[]> {
    const products = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: Suplier,
          as: "supliers",
        },
      ],
    });
    return products.map((product) => product as ProductInstance);
  }
  public async findByBarCode(barCode: string): Promise<ProductInstance> {
    const product = await Product.findOne({
      where: {
        barCode: barCode,
      },
      include: [
        {
          model: Suplier,
          as: "supliers",
        },
      ],
    });
    return product as ProductInstance;
  }
}
