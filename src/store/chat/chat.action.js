import { getConversationsFromServer } from '../../service/api.service'
import { createAction } from '../../utils/helper'
import { CHAT_ACTION_TYPE } from './chat.type'


export const setActiveConversation = (conversation) => {
    return createAction(CHAT_ACTION_TYPE.SET_ACTIVE_CONVERSATION, conversation)
}

const fetchConversationsStart = () => {
    return createAction(CHAT_ACTION_TYPE.FETCH_CONVERSATION_START)
}

const fetchConversationsSuccess = (conversations) => {
    return createAction(CHAT_ACTION_TYPE.FETCH_CONVERSATION_SUCCESS, conversations)
}

const fetchConversationsFailed = (error) => {
    return createAction(CHAT_ACTION_TYPE.FETCH_CONVERSATION_FAILED, error)
}

export const fetchConversationsAsync = (token) => async (dispatch) => {
    dispatch(fetchConversationsStart())

    try {
        const res = await getConversationsFromServer(token)
        if (res.status !== 200) {
            throw new Error(res.error)
        }
        console.log('res dans async : ', res)
        return dispatch(fetchConversationsSuccess(res.conversations))
    } catch (error) {
        dispatch(fetchConversationsFailed(error))
    }
}