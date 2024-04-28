import { ADD_USER, addUserAction } from "../../../store/actions";

interface userInterface {
  user: string;
  userId: string;
  userAdmin: boolean;
}

export const addUser = (user: userInterface): addUserAction => {
  return {
    type: ADD_USER,
    payload: user,
  };
};
