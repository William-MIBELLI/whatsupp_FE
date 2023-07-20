import { CHAT_ACTION_TYPE } from "./chat.type"


const initialState = {
    isLoading: false,
    error: undefined,
    conversations: [],
    activeConversation: {},
    notifications: []
}

export const chatReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case CHAT_ACTION_TYPE.FETCH_CONVERSATION_START:
            return {
                ...state,
                error: undefined,
                isLoading: true
            }
        case CHAT_ACTION_TYPE.FETCH_CONVERSATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                conversations: payload
            }
        case CHAT_ACTION_TYPE.FETCH_CONVERSATION_FAILED:
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        case CHAT_ACTION_TYPE.SET_ACTIVE_CONVERSATION:
            return {
                ...state,
                activeConversation: {...payload}
            }
        default:
            return state
    }
}