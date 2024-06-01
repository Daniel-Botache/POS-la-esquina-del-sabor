import axios from "axios";
import { errorMessage } from "../../auth/hooks/notifications";

export async function getBaleByIdService(id: number) {
  try {
    const response = await axios.get(`/bale/${id}`);
    console.log(response.data);
    if (response.data) {
      return response.data;
    }
    errorMessage("No se encontró producto");
    return false;
  } catch (error) {
    errorMessage("Problema con el servidor");
    return false;
  }
}
