export interface interfaceState {
  user: string;
  userId: string;
  userAdmin: boolean;
}

export const initialState: interfaceState = {
  user: "",
  userId: "",
  userAdmin: false,
};
