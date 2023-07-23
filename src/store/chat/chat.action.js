import {
    fetchActiveConversationFromDb,
    fetchMessages,
    getConversationsFromServer,
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
    return createAction(CHAT_ACTION_TYPE.FETCH_ACTIVE_CONVERSATION_SUCCESS, {active, conversations});
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
