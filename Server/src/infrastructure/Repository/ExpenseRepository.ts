import { Expense } from "../config/database";
import { Product } from "../config/database";
import { IExpenseRepository } from "../../application/repositories/IExpenseRepository";
import { ProductInstance } from "../../domain/models/ProductAttributes";
import { ExpenseInstance } from "../../domain/models/ExpenseAttributes";

export class SaleRepository implements IExpenseRepository {
  public async findById(id: string): Promise<ExpenseInstance | null> {
    const expenseData = await Expense.findByPk(id, {
      include: [
        {
          model: Product,
          as: "products",
        },
      ],
    });
    return expenseData as ExpenseInstance;
  }
  public async create(data: any): Promise<boolean> {
    try {
      const { description, type, date, total, products } = data;
      const created = (await Expense.create(
        {
          description,
          type,
          total,
          date,
        },
        {
          include: [{ model: Product, as: "products" }], // Esto incluye el modelo durante la creación si es necesario
        }
      )) as ExpenseInstance;

      if (products && products.length > 0 && created && created.addProducts) {
        const productsToAssociate = (await Product.findAll({
          where: { id: products },
        })) as ProductInstance[];

        if (productsToAssociate.length > 0) {
          await created.addProducts(productsToAssociate);
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
}
