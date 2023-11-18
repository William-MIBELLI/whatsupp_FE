import { useDispatch, useSelector } from "react-redux";
import ChatBody from "../chat-body/chatBody";
import ChatFooter from "../chat-footer/chatFooter";
import ChatHeader from "../chat-header/chatHeader";
import { Component } from "./chatContainer.style";
import { selectChat } from "../../../store/chat/chat.selector";
import { useContext, useEffect } from "react";
import { clearUnreadMsg, toggleActiveConvoStatus } from "../../../store/chat/chat.action";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { SocketContext } from "../../../App";
import SideButton from "../../side-button/sideButton";

const ChatContainer = () => {

    const { activeConversation } = useSelector(selectChat)
    const {_id: userId } = useSelector(selectCurrentUser)
    const { socket } = useContext(SocketContext)
    const dispatch = useDispatch()

    //On repasse la activeConversation en displayed = true si jamais luser a back depuis settings avec beforebutton
    useEffect(() => {
        if (activeConversation) {
            socket.emit('reset-unreadByUsers', {convoId: activeConversation._id, userId})
            dispatch(clearUnreadMsg(activeConversation, userId))
            dispatch(toggleActiveConvoStatus(true))
        }
    }, [])
    

    return (
        <Component>
            <ChatHeader />
            <ChatBody />
            <ChatFooter />
        </Component>
    )
}

export default ChatContainer