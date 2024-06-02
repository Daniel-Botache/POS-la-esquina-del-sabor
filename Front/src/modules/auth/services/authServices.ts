import axios from "axios";
import { errorMessage } from "../hooks/notifications";

export interface request {
  data: { access: boolean; id: string; admin: boolean; user: string };
}

export async function loginService(user: string, password: string) {
  try {
    const data: request = await axios.post("/user/login", {
      user: user,
      password: password,
    });

    const access = data.data.access;
    if (access) {
      return data.data;
    }
    errorMessage("Usuario no encontrado");
    return false;
  } catch (error: any) {
    errorMessage(error.response.data.message);
    return false;
  }
}
