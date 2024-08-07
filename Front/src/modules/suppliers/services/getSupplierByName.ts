import axios from "axios";

export async function getSupplierByName(name: string) {
  try {
    const data = await axios.get(`/suplier/search?name=${name}`);
    return data.data.success;
  } catch (error: any) {
    return false;
  }
}
