import { initialState, interfaceState } from "../../../store/state";
import { actionTypes, ADD_USER } from "../../../store/actions";

export function authReducer(
  state = initialState,
  action: actionTypes
): interfaceState {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        userId: action.payload.userId,
        user: action.payload.user,
        userAdmin: action.payload.userAdmin,
      };
      break;

    default:
      return state;
      break;
  }
}
