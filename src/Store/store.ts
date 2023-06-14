import { combineReducers, createStore } from "redux";
import { chatReducer } from "./reducers/chatReducer";
import { authReducer } from "./reducers/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer
})

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>