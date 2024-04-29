import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/redux/authSlice";

export const store = configureStore({ reducer: { auth: authReducer } });

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export default store;
