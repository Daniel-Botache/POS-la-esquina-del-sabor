import { Model, Optional } from "sequelize";

interface ExpenseAttribute {
  id: string;
  description: string;
  type: string;
  date: Date;
  total: number;
}

interface ExpenseCreationAttributes
  extends Optional<ExpenseAttribute, "description"> {}

export interface ExpenseInstance
  extends Model<ExpenseAttribute, ExpenseCreationAttributes>,
    ExpenseAttribute {
  createdAt?: Date;
  updatedAt?: Date;
}
