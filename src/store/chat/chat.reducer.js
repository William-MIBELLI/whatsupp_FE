import { CHAT_ACTION_TYPE } from "./chat.type"


const initialState = {
    isLoading: false,
    error: undefined,
    conversations: [],
    activeConversation: undefined,
    notifications: []
}

export const chatReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case CHAT_ACTION_TYPE.FETCH_CONVERSATION_START:
        case CHAT_ACTION_TYPE.FETCH_ACTIVE_CONVERSATION_START:
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
        case CHAT_ACTION_TYPE.FETCH_ACTIVE_CONVERSATION_FAILED:
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        case CHAT_ACTION_TYPE.FETCH_ACTIVE_CONVERSATION_SUCCESS:
            return {
                ...state,
                activeConversation: payload.active,
                conversations: payload.conversations,
                isLoading: false,
                error: undefined
            }
        default:
            return state
    }
}