import axios from "axios";
import { errorMessage } from "../../auth/hooks/notifications";

export async function getExpensesToday() {
  try {
    const expenses = await axios.get("/expense/expenseToday");

    return expenses.data.success;
  } catch (error) {
    const err = error as Error;
    errorMessage(err.message);
    return [];
  }
}
