import axios from "axios";

import { Sales } from "../../profit/redux/profitSlice";

export async function getCreditsByClientId(id: string) {
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
      const arraySorted = [...arrayConcat].sort((a: Sales, b: Sales) =>
        a.createdAt?.localeCompare(b.createdAt)
      );
      return arraySorted;
    }
    return sales.data.success;
  } catch (error: any) {
    return [];
  }
}
