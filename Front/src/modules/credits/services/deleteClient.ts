import axios from "axios";
import { succesMessage, errorMessage } from "../../auth/hooks/notifications";

export async function deleteClient(id: string) {
  try {
    const deletedClient = await axios.delete(`/client/${id}`);
    if (deletedClient.data) {
      succesMessage("Se eliminó completamente el cliente");
      return true;
    }
    errorMessage("Problema al eliminar clientes");
    return false;
  } catch (error) {
    errorMessage("Problema al eliminar clientes");
    return false;
  }
}
