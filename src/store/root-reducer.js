import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { chatReducer } from "./chat/chat.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer
})

