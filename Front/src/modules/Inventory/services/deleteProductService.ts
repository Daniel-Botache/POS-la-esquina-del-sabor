import axios from "axios";
import { errorMessage, succesMessage } from "../../auth/hooks/notifications";

export async function deleteProductService(id: number) {
  try {
    const response = await axios.delete(`/product/${id}`);
    console.log(response.data);
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
