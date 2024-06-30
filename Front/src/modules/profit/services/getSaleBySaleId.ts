import axios from "axios";
import { errorMessage } from "../../auth/hooks/notifications";
import { Sales } from "../redux/profitSlice";

export async function getSaleBySaleId(id: string) {
  try {
    const sales = await axios.get(`/sale/${id} `);
    const arraySale = [];
    arraySale.push(sales.data);
    if (arraySale.length > 0) {
      const arrayFiltered = arraySale.filter(
        (sale: Sales) => sale.credit == false
      );
      return arrayFiltered;
    }
    return errorMessage("Datos no encontrados");
  } catch (error: any) {
    const err = error as Error;
    errorMessage(err.message);
    return [];
  }
}
