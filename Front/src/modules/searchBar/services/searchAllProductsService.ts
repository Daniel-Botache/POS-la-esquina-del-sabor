import axios from "axios";
import { errorMessage } from "../../auth/hooks/notifications";

export async function searchAllProducts() {
  try {
    const data = await axios.get("/product");
    return data.data.success;
  } catch (error: any) {
    errorMessage(error.response.data.message);
    return false;
  }
}

export async function searchAllBale() {
  try {
    const data = await axios.get("/bale");
    return data.data;
  } catch (error: any) {
    errorMessage(error.response.data.message);
    return false;
  }
}
