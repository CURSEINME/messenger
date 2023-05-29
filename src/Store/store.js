import { combineReducers, createStore } from "redux";
import { chatReducer } from "./chatReducer";
import { authReducer } from "./authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer
})

export const store = createStore(rootReducer)