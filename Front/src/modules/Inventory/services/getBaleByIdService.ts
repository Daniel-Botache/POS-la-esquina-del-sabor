import axios from "axios";
import { errorMessage } from "../../auth/hooks/notifications";

export async function getBaleByIdService(id: number) {
  try {
    const response = await axios.get(`/bale/${id}`);
    console.log(response.data);
    if (response.data.succes) {
      return response.data.succes;
    }
    errorMessage("No se encontró prodcuto");
    return false;
  } catch (error) {
    errorMessage("Problema con el servidor");
    return false;
  }
}
