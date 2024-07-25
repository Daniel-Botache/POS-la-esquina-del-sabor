import axios from "axios";
import { errorMessage } from "../../auth/hooks/notifications";

export async function getAllClients() {
  try {
    const response = await axios.get(`/client`);

    if (response.data) {
      return response.data;
    }
    errorMessage("No se encontraron clientes");
    return false;
  } catch (error) {
    errorMessage("Clientes no encontrados");
    return false;
  }
}
