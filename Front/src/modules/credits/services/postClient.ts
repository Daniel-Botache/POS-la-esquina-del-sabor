import axios from "axios";
import { Client } from "../redux/clientSlice";

export async function postClient(client: Client) {
  try {
    const createdClient = await axios.post("client", client);
    return createdClient.data;
  } catch (error) {
    return {
      message: "Problema con el servidor ",
      succes: false,
    };
  }
}
