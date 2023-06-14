import { auth } from "../../firebase"
import { ChatAction, ChatState } from "../../types"

const initialState: ChatState = {
  chatId: null,
  user: null
}


export function chatReducer(state = initialState, action: ChatAction) {
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