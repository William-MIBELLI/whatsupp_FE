import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { chatReducer } from "./chat/chat.reducer";
import { callReducer } from "./call/call.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer,
    call: callReducer
})

