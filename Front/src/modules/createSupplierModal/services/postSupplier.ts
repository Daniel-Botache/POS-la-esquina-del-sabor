import axios from "axios";
import { succesMessage, errorMessage } from "../../auth/hooks/notifications";
export interface response {
  data: {
    message: string;
    succes: boolean;
  };
}
interface Supplier {
  company: string;
  adviser: string;
  tel: string;
}
export async function postNewSupplier({ company, adviser, tel }: Supplier) {
  try {
    const response: response = await axios.post("/suplier", {
      company: company,
      adviser: adviser,
      tel: tel,
    });
    if (response.data.succes) {
      succesMessage(response.data.message);
      return response.data.succes;
    } else {
      errorMessage(response.data.message);
      return response.data.succes;
    }
  } catch (error: any) {
    errorMessage(error.response.data.message);
    return false;
  }
}
