import axios from "axios";
import { errorMessage } from "../../auth/hooks/notifications";

export async function getSaleBySaleId(id: string) {
  try {
    const sales = await axios.get(`/sale/${id} `);
    const arraySale = [];
    arraySale.push(sales.data);
    if (arraySale.length > 0) {
      return arraySale;
    }
    return errorMessage("Datos no encontrados");
  } catch (error: any) {
    const err = error as Error;
    errorMessage(err.message);
    return [];
  }
}
