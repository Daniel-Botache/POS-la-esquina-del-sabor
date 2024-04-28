import axios from "axios";

export interface request {
  data: { access: boolean; id: string; admin: boolean; username: string };
}

export async function loginService(user: string, password: string) {
  try {
    const data: request = await axios.post("/user/login", {
      user: user,
      password: password,
    });
    console.log(data);
    const access = data.data.access;
    if (access) {
      return data.data;
    }
    return false;
  } catch (error) {
    return false;
  }
}
