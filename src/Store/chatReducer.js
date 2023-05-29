import { auth } from "../firebase"

const defaulfState = {
  chatId: "",
  user:{}
}


export function chatReducer(state = defaulfState, action) {
    const currentUser = auth.currentUser

    if (currentUser) {
      if (action.type == "CHANGE_USER") {
        return {
          user: action.payload,
          chatId: currentUser.uid > action.payload.uid
            ? currentUser.uid + action.payload.uid
            : action.payload.uid + currentUser.uid
        }
      }
    }
    return state
}