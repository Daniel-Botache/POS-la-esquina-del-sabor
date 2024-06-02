import axios from "axios";
import { errorMessage, succesMessage } from "../../auth/hooks/notifications";

export async function deleteProductService(id: number, route: string) {
  try {
    if (route == "bale") {
      const response = await axios.delete(`/bale/${id}`);
      if (response.data) {
        succesMessage("Se eliminó completamente el producto");
        return true;
      }
      errorMessage("El producto no pudo ser eliminado");
      return false;
    }
    const response = await axios.delete(`/product/${id}`);

    if (response.data) {
      succesMessage("Se eliminó completamente el producto");
      return true;
    }
    errorMessage("El producto no pudo ser eliminado");
    return false;
  } catch (error) {
    errorMessage("El producto no pudo ser eliminado");
    return false;
  }
}
