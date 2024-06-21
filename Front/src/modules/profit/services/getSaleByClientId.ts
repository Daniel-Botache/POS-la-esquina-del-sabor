import axios from "axios";
import { errorMessage } from "../../auth/hooks/notifications";

export async function getSaleByClientId(id: string) {
  try {
    const sales = await axios.get(`/sale/salesClient/${id} `);
    if (sales.data.success.length > 0) {
      return sales.data.success;
    }
    return sales.data.message;
  } catch (error: any) {
    const err = error as Error;
    errorMessage(err.message);
    return [];
  }
}
