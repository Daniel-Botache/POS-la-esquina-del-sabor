import axios from "axios";
import { errorMessage } from "../../auth/hooks/notifications";

export async function getAllSuppliers() {
  try {
    const response = await axios.get(`/suplier`);

    if (response.data) {
      return response.data;
    }
    errorMessage("No se encontraron proveedores");
    return false;
  } catch (error) {
    errorMessage("Proveedores no encontrados");
    return false;
  }
}
