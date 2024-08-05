import axios from "axios";
import { errorMessage } from "../../auth/hooks/notifications";
import { Sales } from "../../profit/redux/profitSlice";

export async function getSaleByClientId(id: string) {
  try {
    const sales = await axios.get(`/sale/salesClient/${id} `);
    if (sales.data.success.length > 0) {
      const arrayFilteredCredits = sales.data.success.filter(
        (sale: Sales) => sale.credit == true
      );
      const arrayFilteredPayments = sales.data.success.filter(
        (sale: Sales) => sale.movementType == "Abono"
      );
      const arrayConcat = arrayFilteredCredits.concat(arrayFilteredPayments);
      return arrayConcat;
    }
    return sales.data.success;
  } catch (error: any) {
    const err = error as Error;
    errorMessage(err.message);
    return [];
  }
}
