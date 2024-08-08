import axios from "axios";

export async function getSupplierById(id: string) {
  try {
    const response = await axios.get(`/suplier/${id}`);

    if (response.data) {
      return response.data.success;
    }

    return false;
  } catch (error) {
    return false;
  }
}
