import axios from "axios";
import { errorMessage, succesMessage } from "../../auth/hooks/notifications";

interface Expense {
  type: string;
  description: string;
  total: number;
  userId: string;
  suplierId: string;
}

export async function postExpense(expense: Expense) {
  try {
    console.log(expense);
    const data = await axios.post("/expense", expense);
    if (data.data.succes == true) {
      succesMessage(data.data.message);
      return true;
    }
    errorMessage(data.data.message);
    return false;
  } catch (error) {
    errorMessage("Problema con el servidor");
    return false;
  }
}
