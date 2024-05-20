import axios from "axios";
import { succesMessage, errorMessage } from "../../auth/hooks/notifications";
export interface Product {
  id: string | null;
  img: string;
  name: string;
  type: string;
  volume: number;
  maximum: number;
  barCode: string;
  price: number;
  spent: boolean;
  bale: boolean | null;
  productId: number | null;
  individualQuanty: number | null;
  supliers: string[];
}

export async function postNewProduct(product: Product, route: string) {
  if (route == "bale") {
    try {
      const newBale = await axios.post(`/bale`, product);
      succesMessage(newBale.data.message);
      return;
    } catch (error) {
      const err = error as Error;
      errorMessage(err.message);
    }
  }
  try {
    const newProduct = await axios.post(`/product`, product);
    succesMessage(newProduct.data.message);
    return;
  } catch (error) {
    const err = error as Error;
    errorMessage(err.message);
  }
}
