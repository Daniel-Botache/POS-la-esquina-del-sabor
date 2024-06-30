import { Model, Optional } from "sequelize";
import { ProductInstance } from "./ProductAttributes";
interface ExpenseAttribute {
  id: string;
  description: string;
  type: string;
  total: number;
}

interface ExpenseCreationAttributes
  extends Optional<ExpenseAttribute, "description"> {}

export interface ExpenseInstance
  extends Model<ExpenseAttribute, ExpenseCreationAttributes>,
    ExpenseAttribute {
  createdAt?: Date;
  updatedAt?: Date;
  addProducts?: (
    products: ProductInstance[] | ProductInstance
  ) => Promise<void>;
}
