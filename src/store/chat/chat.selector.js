export const selectChat = (state) => state.chat;

export const selectConversationById = (convoId) => (state) => {
    const convo = state.chat.conversations.find((c) => c._id === convoId);
    if (!convo) {
        return {};
    }
    return convo;
};

export const selectTypingUser = state => {
    return state.chat.typingUsers
}

export const selectFiles = state => {
    return state.chat.files
}

export const selectImagePreview = index => state => {
    const file = state.chat.files[index]
    if (file) {
        return file.preview
    }
    return undefined
}
