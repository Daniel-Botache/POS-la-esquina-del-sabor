import axios from "axios";
import { Client } from "../redux/clientSlice";

export async function putClient(id: number, client: Client) {
  try {
    const upDatedClient = await axios.put(`/client/${id}`, client);
    return upDatedClient;
  } catch (error) {
    return {
      succes: false,
      message: "Problema con el servidor",
    };
  }
}
