import axios from "axios";

export async function deleteSupplier(id: string) {
  try {
    const deletedClient = await axios.delete(`/suplier/${id}`);
    console.log(deletedClient);
    if (deletedClient.data) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
