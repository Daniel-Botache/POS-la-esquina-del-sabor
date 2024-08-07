import axios from "axios";
import { errorMessage } from "../../auth/hooks/notifications";

export async function getClientById(id: string) {
  try {
    const response = await axios.get(`/client/${id}`);

    if (response.data) {
      return response.data;
    }
    errorMessage("No se encontró cliente");
    return false;
  } catch (error) {
    errorMessage("Cliente no encontrado");
    return false;
  }
}
