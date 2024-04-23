import { ExpenseInstance } from "../../domain/models/ExpenseAttributes";

export interface IExpenseRepository {
  findById(id: string): Promise<ExpenseInstance | null>;
  create(data: ExpenseInstance): Promise<boolean>;
}
