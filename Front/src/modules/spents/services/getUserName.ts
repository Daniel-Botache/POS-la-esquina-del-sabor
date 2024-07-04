import axios from "axios";

export async function getUserName(id: string) {
  try {
    const data = await axios.get(`/user/${id}`);
    const userName = data.data.user;
    return userName;
  } catch (error) {
    return "";
  }
}
