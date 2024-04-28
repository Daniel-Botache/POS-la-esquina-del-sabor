import axios from "axios";
interface request {
  data: { access: boolean; id: string; admin: boolean };
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
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
