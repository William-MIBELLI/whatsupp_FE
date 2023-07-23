import {
    fetchActiveConversationFromDb,
    fetchMessages,
    fetchMessagesFromDb,
    getConversationsFromServer,
    sendMessageOnServer,
} from "../../service/api.service";
import { createAction } from "../../utils/helper";
import { CHAT_ACTION_TYPE } from "./chat.type";

export const setActiveConversation = (conversation) => {
    return createAction(CHAT_ACTION_TYPE.SET_ACTIVE_CONVERSATION, conversation);
};

const fetchConversationsStart = () => {
    return createAction(CHAT_ACTION_TYPE.FETCH_CONVERSATION_START);
};

const fetchConversationsSuccess = (conversations) => {
    return createAction(
        CHAT_ACTION_TYPE.FETCH_CONVERSATION_SUCCESS,
        conversations
    );
};

const fetchConversationsFailed = (error) => {
    return createAction(CHAT_ACTION_TYPE.FETCH_CONVERSATION_FAILED, error);
};

export const fetchConversationsAsync = (token) => async (dispatch) => {
    dispatch(fetchConversationsStart());

    try {
        const res = await getConversationsFromServer(token);
        if (res.status !== 200) {
            throw new Error(res.error);
        }
        console.log("res dans async : ", res);
        return dispatch(fetchConversationsSuccess(res.conversations));
    } catch (error) {
        dispatch(fetchConversationsFailed(error));
    }
};

const fetchActiveConversationStart = () => {
    return createAction(CHAT_ACTION_TYPE.FETCH_ACTIVE_CONVERSATION_START);
};

const fetchActiveConversationSuccess = (active, conversations) => {
    const existingConv = conversations.find((c) => c._id === active._id);
    if (!existingConv) {
        const newConversations = [...conversations, active];
        return createAction(
            CHAT_ACTION_TYPE.FETCH_ACTIVE_CONVERSATION_SUCCESS,
            { active, conversations: newConversations }
        );
    }
    return createAction(CHAT_ACTION_TYPE.FETCH_ACTIVE_CONVERSATION_SUCCESS, {
        active,
        conversations,
    });
};

const fetchActiveConversationFailed = (error) => {
    return createAction(
        CHAT_ACTION_TYPE.FETCH_ACTIVE_CONVERSATION_FAILED,
        error
    );
};

export const fetchActiveConversationAsync =
    (token, userId, conversations) => async (dispatch) => {
        dispatch(fetchActiveConversationStart());

        try {
            const res = await fetchActiveConversationFromDb(token, userId);
            if (typeof res === Error) {
                throw res;
            }
            return dispatch(
                fetchActiveConversationSuccess(res.convo, conversations)
            );
        } catch (error) {
            dispatch(fetchActiveConversationFailed(error));
        }
    };

const fetchMessagesStart = () => {
    return createAction(CHAT_ACTION_TYPE.FETCH_MESSAGES_START);
};

const fetchMessagesSuccess = (messages) => {
    return createAction(CHAT_ACTION_TYPE.FETCH_MESSAGES_SUCCESS, messages);
};

const fetchMessagesFailed = (error) => {
    return createAction(CHAT_ACTION_TYPE.FETCH_MESSAGES_FAILED, error);
};

export const fetchMessagesAsync =
    (token, conversationId) => async (dispatch) => {
        dispatch(fetchMessagesStart());

        try {
            const res = await fetchMessagesFromDb(token, conversationId);
            if (typeof res === Error) {
                throw new Error(res?.message);
            }
            return dispatch(fetchMessagesSuccess(res.messages));
        } catch (error) {
            dispatch(fetchMessagesFailed(error));
        }
    };

const sendMessageStart = () => {
    return createAction(CHAT_ACTION_TYPE.SEND_MESSAGE_START);
};

const sendMessageSuccess = (message, state) => {
    const newMessages = [...state.messages, message];
    const newConversations = state.conversations.map((convo) => {
        if (convo._id === message.conversation) {
            return { ...convo, latestMessage: message };
        }
        return convo;
    });
    return createAction(CHAT_ACTION_TYPE.SEND_MESSAGE_SUCCESS, {
        messages: newMessages,
        conversations: newConversations,
    });
};

const sendMessageFailed = (error) => {
    return createAction(CHAT_ACTION_TYPE.SEND_MESSAGE_FAILED, error);
};

export const sendMessageAsync = (token, state, values) => async (dispatch) => {
    dispatch(sendMessageStart());

    try {
        const res = await sendMessageOnServer(token, values);
        if (typeof res === Error) {
            throw new Error(res?.message);
        }
        dispatch(sendMessageSuccess(res.message, state));
    } catch (error) {
        dispatch(sendMessageFailed(error));
    }
};
