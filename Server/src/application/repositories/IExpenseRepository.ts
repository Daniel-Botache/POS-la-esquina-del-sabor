import { ExpenseInstance } from "../../domain/models/ExpenseAttributes";

export interface IExpenseRepository {
  findByDate(since: string, until: string): Promise<ExpenseInstance[]>;
  findByDateNow(): Promise<ExpenseInstance[]>;
}
