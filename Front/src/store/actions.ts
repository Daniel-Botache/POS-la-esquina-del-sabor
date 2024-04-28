export const ADD_USER = "ADD_USER";
export const SET_USER_TYPE = "SET_USER_TYPE";

export interface addUserAction {
  type: typeof ADD_USER;
  payload: { user: string; userId: string; userAdmin: boolean };
}

export interface setUserType {
  type: typeof SET_USER_TYPE;
  payload: string;
}
export type actionTypes = addUserAction | setUserType;
