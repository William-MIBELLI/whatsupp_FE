import ChatBody from "../chat-body/chatBody";
import ChatFooter from "../chat-footer/chatFooter";
import ChatHeader from "../chat-header/chatHeader";
import { Component } from "./chatContainer.style";

const ChatContainer = () => {

    return (
        <Component>
            <ChatHeader />
            <ChatBody />
            <ChatFooter/>
        </Component>
    )
}

export default ChatContainer