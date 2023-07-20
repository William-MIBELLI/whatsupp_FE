import { useSelector } from "react-redux";
import { Component } from "./conversations.style";
import { selectChat } from "../../../store/chat/chat.selector";
import Conversation from "../conversation/conversation";

const Conversations = () => {

    const { conversations } = useSelector(selectChat)

    return (
        <Component>
            {
                conversations && conversations.map(convo => {
                    return (
                        <Conversation convo={convo} key={convo._id}/>
                    )
                })
            }
        </Component>
    );
};

export default Conversations;
