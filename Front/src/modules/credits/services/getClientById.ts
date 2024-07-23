import axios from "axios";
import { errorMessage } from "../../auth/hooks/notifications";

export async function getProductByIdService(id: number) {
  try {
    const response = await axios.get(`/client/${id}`);

    if (response.data) {
      return response.data;
    }
    errorMessage("No se encontró prodcuto");
    return false;
  } catch (error) {
    errorMessage("Problema con el servidor");
    return false;
  }
}
