import axios from "axios";
import { errorMessage } from "../../auth/hooks/notifications";

export async function getExpensesyDate(since: string, until: string) {
  try {
    const expenses = await axios.post(`/expense//expenseDate`, {
      since: since,
      until: until,
    });
    if (expenses.data.success.length > 0) {
      return expenses.data.success;
    }
    return errorMessage(expenses.data.message);
  } catch (error: any) {
    const err = error as Error;
    errorMessage(err.message);
    return [];
  }
}
