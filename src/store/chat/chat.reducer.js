import { CHAT_ACTION_TYPE } from "./chat.type"


const initialState = {
    isLoading: false,
    error: undefined,
    conversations: [],
    activeConversation: undefined,
    messages: [],
    notifications: [],
    onlineUsers: [],
    typingUsers: [],
    files: []
}

export const chatReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case CHAT_ACTION_TYPE.FETCH_CONVERSATION_START:
        case CHAT_ACTION_TYPE.FETCH_ACTIVE_CONVERSATION_START:
        case CHAT_ACTION_TYPE.FETCH_MESSAGES_START:
        case CHAT_ACTION_TYPE.SEND_MESSAGE_START:
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
        case CHAT_ACTION_TYPE.FETCH_MESSAGES_FAILED:
        case CHAT_ACTION_TYPE.SEND_MESSAGE_FAILED:
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
        case CHAT_ACTION_TYPE.FETCH_MESSAGES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: undefined,
                messages: payload
            }
        case CHAT_ACTION_TYPE.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: undefined,
                messages: payload.messages,
                conversations: payload.conversations
            }
        case CHAT_ACTION_TYPE.HANDLE_MESSAGE_RECEIVED:
            return {
                ...state,
                messages: payload.messages,
                conversations: payload.conversations
            }
        case CHAT_ACTION_TYPE.SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: payload
            }
        case CHAT_ACTION_TYPE.CLEAR_CHAT_STATE:
            return initialState
        case CHAT_ACTION_TYPE.ADD_TYPING_USER:
        case CHAT_ACTION_TYPE.REMOVE_TYPING_USER:
            return {
                ...state,
                typingUsers: payload
            }
        case CHAT_ACTION_TYPE.CLEAR_FILES:
            return {
                ...state,
                files: []
            }
        case CHAT_ACTION_TYPE.ADD_FILE:
        case CHAT_ACTION_TYPE.REMOVE_FILE:
            return {
                ...state,
                files: payload
            }
        case CHAT_ACTION_TYPE.REMOVE_CONVERSATION:
            return {
                ...state,
                conversations: payload
            }
        case CHAT_ACTION_TYPE.REMOVE_ACTIVE_CONVERSATION:
            return {
                ...state,
                activeConversation: undefined
            }
        case CHAT_ACTION_TYPE.REMOVE_USER:
            return {
                ...state,
                activeConversation: payload
            }
        case CHAT_ACTION_TYPE.TOGGLE_ACTIVE_CONVERSATION_STATUS:
            return {
                ...state,
                activeConversation: {
                    ...state.activeConversation,
                    isDisplayed: payload
                }
            }
        case CHAT_ACTION_TYPE.CLEAR_UNREAD_MESSAGE:
            return {
                ...state,
                activeConversation: payload
            }
        default:
            return state
    }
}