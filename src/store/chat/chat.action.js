import {
    fetchActiveConversationFromDb,
    fetchMessagesFromDb,
    getConversationsFromServer,
    sendMessageOnServer,
} from "../../service/api.service";
import { createAction } from "../../utils/helper";
import { CHAT_ACTION_TYPE } from "./chat.type";

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
        const res = await getConversationsFromServer(token); // On request la BDD
        if (res.status !== 200) {
            throw new Error(res.error);
        }
        const sortedConvo = res.conversations; // On tri les conversations selon la
        sortedConvo.sort((a, b) => {
            // date du dernier message
            return (
                Date.parse(b?.latestMessage?.createdAt) -
                Date.parse(a?.latestMessage?.createdAt)
            );
        });
        return dispatch(fetchConversationsSuccess(sortedConvo));
    } catch (error) {
        dispatch(fetchConversationsFailed(error));
    }
};

const fetchActiveConversationStart = () => {
    return createAction(CHAT_ACTION_TYPE.FETCH_ACTIVE_CONVERSATION_START);
};

const fetchActiveConversationSuccess = (active, conversations, partnerId) => {
    const existingConv = conversations.find((c) => c._id === active._id);
    if (!existingConv) {
        //Si la convo n'existe pas, on la push dans conversations
        const newConversations = [...conversations, active];
        return createAction(
            CHAT_ACTION_TYPE.FETCH_ACTIVE_CONVERSATION_SUCCESS,
            {
                active: { ...active, isDisplayed: true },
                conversations: newConversations,
            }
        );
    }
    const updatedConvo = conversations.map((convo) => {
        //Sinon on resest unreadByUsers
        return convo._id === active._id
            ? {
                  ...convo,
                  unreadByUsers: convo.unreadByUsers.map((item) => {
                      return item.userId !== partnerId
                          ? { ...item, msgCount: 0 }
                          : item;
                  }),
              }
            : convo;
    });
    return createAction(CHAT_ACTION_TYPE.FETCH_ACTIVE_CONVERSATION_SUCCESS, {
        active: { ...active, isDisplayed: true },
        conversations: updatedConvo,
    });
};

const fetchActiveConversationFailed = (error) => {
    return createAction(
        CHAT_ACTION_TYPE.FETCH_ACTIVE_CONVERSATION_FAILED,
        error
    );
};

export const fetchActiveConversationAsync =
    (token, userId, conversations, convoId) => async (dispatch) => {
        dispatch(fetchActiveConversationStart());

        try {
            const res = await fetchActiveConversationFromDb(
                token,
                userId,
                convoId
            );
            if (typeof res === Error) {
                throw res;
            }
            return dispatch(
                fetchActiveConversationSuccess(res.convo, conversations, userId)
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
    const newConversations = getNewConversationsSorted(
        state.conversations,
        message
    );
    return createAction(CHAT_ACTION_TYPE.SEND_MESSAGE_SUCCESS, {
        messages: newMessages,
        conversations: newConversations,
    });
};

const sendMessageFailed = (error) => {
    return createAction(CHAT_ACTION_TYPE.SEND_MESSAGE_FAILED, error);
};

export const sendMessageAsync =
    (token, state, values, files) => async (dispatch) => {
        dispatch(sendMessageStart());
        try {
            const res = await sendMessageOnServer(token, values, files);
            if (typeof res === Error) {
                throw new Error(res?.message);
            }
            dispatch(sendMessageSuccess(res.message, state));
            return res.message;
        } catch (error) {
            dispatch(sendMessageFailed(error));
        }
    };

export const handleReceivedMessage = (message, state, userId) => {
    const { activeConversation, conversations, messages } = state;
    const newConversations = getNewConversationsSorted(conversations, message); //On tri les convos afin davoir celle avec le dernier message reçue en haut
    if (message.conversation._id === activeConversation?._id && activeConversation?.isDisplayed) {
        const newMessages = [...messages, message]; //Si le message est dans la convo active, on push le message dans messages
        return createAction(CHAT_ACTION_TYPE.HANDLE_MESSAGE_RECEIVED, {
            conversations: newConversations,
            messages: newMessages,
        });
    }
    //Si la conversation n'est pas active, on met a jour le unreadMsgCount en mappant newConvo
    const updatedConvo = newConversations.map((convo) => {
        return convo._id === message.conversation._id
            ? {
                  //Si c'est la convo qui recoit le message
                  ...convo,
                  unreadByUsers: convo.unreadByUsers.map((item) => {
                      //On map sur unreadByUsers pour trouver le bon userId
                      return item.userId === userId
                          ? { ...item, msgCount: item.msgCount + 1 } //Et on y ajoute 1
                          : item;
                  }),
              }
            : convo; //Sinon on return la convo sans modif
    });
    return createAction(CHAT_ACTION_TYPE.HANDLE_MESSAGE_RECEIVED, {
        conversations: updatedConvo,
        messages,
    });
};

export const setOnlineUser = (onlineUsers) => async (dispatch) => {
    const action = createAction(CHAT_ACTION_TYPE.SET_ONLINE_USERS, onlineUsers);
    dispatch(action);
};

const getNewConversationsSorted = (conversations, messageToAdd) => {
    //On crée un nouveau tableau de conversations sans la convo a update
    const newConversations = conversations.filter((c) => {
        return c._id !== messageToAdd.conversation._id;
    });
    //on récupère la convo a update
    const convoToUpdate = conversations.find(
        (c) => c._id === messageToAdd.conversation._id
    );
    //on la place a l'index 0 pour quelle soit affichée en 1er et on update latestMessage
    newConversations.unshift({ ...convoToUpdate, latestMessage: messageToAdd });
    return newConversations;
};

export const clearChat = () => {
    return createAction(CHAT_ACTION_TYPE.CLEAR_CHAT_STATE);
};

export const addTypingUser = (convoId, typingUsers) => {
    //Si l'user est déja en train de type, on ne l'ajoute pas
    const existingTypingUser = typingUsers.includes(convoId);
    if (existingTypingUser) {
        return createAction(CHAT_ACTION_TYPE.ADD_TYPING_USER, typingUsers);
    }
    const newTypingUsers = [...typingUsers, convoId];
    return createAction(CHAT_ACTION_TYPE.ADD_TYPING_USER, newTypingUsers);
};

export const removeTypingUser = (convoId, typingUsers) => {
    const newTypingUsers = typingUsers.filter((t) => t !== convoId);
    return createAction(CHAT_ACTION_TYPE.REMOVE_TYPING_USER, newTypingUsers);
};

export const addFile = (filesToAdd, files) => {
    return createAction(CHAT_ACTION_TYPE.ADD_FILE, [...files, ...filesToAdd]);
};

export const removeFile = (fileIndex, files) => {
    const newFiles = files.filter((f, ind) => ind !== fileIndex);
    return createAction(CHAT_ACTION_TYPE.REMOVE_FILE, newFiles);
};

export const clearFiles = () => {
    return createAction(CHAT_ACTION_TYPE.CLEAR_FILES);
};

export const removeConversation = (convos, convoIdToRemove) => {
    const newConvo = convos.filter((c) => c._id !== convoIdToRemove);
    return createAction(CHAT_ACTION_TYPE.REMOVE_CONVERSATION, newConvo);
};

export const removeActiveConversation = () => {
    return createAction(CHAT_ACTION_TYPE.REMOVE_ACTIVE_CONVERSATION);
};

export const toggleActiveConvoStatus = (status) => {
    return createAction(
        CHAT_ACTION_TYPE.TOGGLE_ACTIVE_CONVERSATION_STATUS,
        status
    );
};

export const clearUnreadMsg = (convo, userId) => {
    const updatedUnreadByUsers = convo.unreadByUsers.map(item => {
        return item.userId === userId ? { ...item, msgCount: 0} : item
    })
    return createAction(CHAT_ACTION_TYPE.CLEAR_UNREAD_MESSAGE, {...convo, unreadByUsers: updatedUnreadByUsers})
}

export const removeUser = (userId, convo) => {
    const { users } = convo;
    const updatedUsers = users.filter((user) => user._id !== userId);
    const updatedConvo = { ...convo, users: updatedUsers };
    return createAction(CHAT_ACTION_TYPE.REMOVE_USER, updatedConvo);
};
