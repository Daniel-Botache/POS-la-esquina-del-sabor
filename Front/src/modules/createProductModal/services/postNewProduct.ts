import axios from "axios";
import { succesMessage, errorMessage } from "../../auth/hooks/notifications";
export interface Product {
  id: string | null;
  img: string | undefined;
  name: string;
  typeId: string | null;
  volume: number | null;
  maximum: number | null;
  barCode: string;
  price: number | null;
  spent: boolean;
  bale: boolean | null;
  productId: number | null;
  individualQuanty: number | null;
  supliers: string[] | null;
}

export async function postNewProduct(product: Product, route: string) {
  if (route == "bale") {
    try {
      const newBale = await axios.post(`/bale`, {
        name: product.name,
        volume: product.volume,
        maximum: product.maximum,
        price: product.price,
        spent: product.spent,
        img: product.img,
        barCode: product.barCode,
        productId: product.productId,
        individualQuanty: product.individualQuanty,
      });
      succesMessage(newBale.data.message);
      return;
    } catch (error: any) {
      errorMessage("Error al crear producto");
      return;
    }
  }
  try {
    const newProduct = await axios.post(`/product`, product);
    succesMessage(newProduct.data.message);
    return;
  } catch (error: any) {
    errorMessage("Error al crear producto");
    return;
  }
}
