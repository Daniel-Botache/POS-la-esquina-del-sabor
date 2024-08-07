import axios from "axios";
import { errorMessage } from "../../auth/hooks/notifications";

export async function getEBasesToday() {
  try {
    const expenses = await axios.get("/base/baseToday");

    return expenses.data.success;
  } catch (error) {
    const err = error as Error;
    errorMessage(err.message);
    return [];
  }
}
