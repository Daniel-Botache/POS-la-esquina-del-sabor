import axios from "axios";

export async function deleteClient(id: string) {
  try {
    const deletedClient = await axios.delete(`/client/${id}`);
    if (deletedClient.data) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
