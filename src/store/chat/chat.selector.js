export const selectChat = (state) => state.chat;

export const selectConversationById = (convoId) => (state) => {
    const convo = state.chat.conversations.find((c) => c._id === convoId);
    if (!convo) {
        //console.log("cant find conversation by id in state, convoId : ", convoId);
        return {};
    }
    //console.log("convo dans selector : ", convo);
    //console.log('conversation dans le state : ', state.chat)
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
    console.log('pas de fichier avec cet index : ', index)
    return undefined
}
