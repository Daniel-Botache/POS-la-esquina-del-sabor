import axios from "axios";
import { errorMessage } from "../../auth/hooks/notifications";
import { Sales } from "../redux/profitSlice";

export async function getSalesToday() {
  try {
    const sales = await axios.get("/sale/saleToday");
    if (sales.data.success.length > 0) {
      const arrayFiltered = sales.data.success.filter(
        (sale: Sales) => sale.credit == false
      );
      return arrayFiltered;
    }
    return sales.data.message;
  } catch (error: any) {
    const err = error as Error;
    errorMessage(err.message);
    return [];
  }
}
