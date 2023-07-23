
export const selectChat = state => state.chat

export const selectConversationById = convoId => state => {
    const convo = state.chat.conversations.find(c => c._id === convoId)
    if (!convo) {
        console.log('cant find conversation by id in state')
        return {}
    }
    return convo
}