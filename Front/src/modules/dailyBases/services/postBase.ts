import axios from "axios";
import { errorMessage, succesMessage } from "../../auth/hooks/notifications";

export interface Base {
  date: string;
  type: string;
  total: number;
  userId: string;
}

export async function postBase(base: Base) {
  try {
    const newBase = await axios.post("/base", base);
    if (newBase.data.succes) {
      succesMessage("Base creada correctamente");
      return;
    }
    errorMessage(newBase.data.message);
  } catch (error) {
    errorMessage("Problema con el servidor");
    return false;
  }
}
