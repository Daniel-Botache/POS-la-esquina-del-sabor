import axios from "axios";
import { errorMessage } from "../../auth/hooks/notifications";

export interface SaleAttributes {
  total: number;
  paymentType: string;
  movementType: string;
  credit: boolean;
  products: string[] | null;
  clientId: string | null;
  userId: string;
  valueCash: number;
}

export async function postSaleService(sale: SaleAttributes) {
  try {
    console.log(sale);
    const newSale = await axios.post("/sale", sale);
    return newSale;
  } catch (error: any) {
    errorMessage(error.response.data.message);
    return false;
  }
}
