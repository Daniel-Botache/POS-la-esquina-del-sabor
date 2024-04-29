import { useDispatch, useSelector } from "react-redux";
import type { RootState, Dispatch } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useCustomDispatch = useDispatch.withTypes<Dispatch>();
export const useCustomSelector = useSelector.withTypes<RootState>();
