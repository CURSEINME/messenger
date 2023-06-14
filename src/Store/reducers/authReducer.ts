import { AuthAction, AuthState } from "../../types"

const initialState: AuthState  = {
  currentUser: null
}
 
export function authReducer(state = initialState, action: AuthAction) {
  switch (action.type) {
    case "CHANGE_ CURRENTUSER": 
      return {
        ...state,
        currentUser: action.payload
      }
    default:   
      return {...state}
  }
}
