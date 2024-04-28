import { combineReducers } from "redux";
import { authReducer } from "../modules/auth/redux/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
