import axios from "axios";
import { errorMessage } from "../../auth/hooks/notifications";

export async function getBasesByDate(since: string, until: string) {
  try {
    const expenses = await axios.post(`/base/baseDate`, {
      since: since,
      until: until,
    });
    if (expenses.data.success.length > 0) {
      return expenses.data.success;
    }
    return errorMessage(expenses.data.message);
  } catch (error) {
    const err = error as Error;
    errorMessage(err.message);
    return [];
  }
}
