import { useDispatch, useSelector } from "react-redux";
import { Component, Container } from "./chatBody.style";
import { selectChat } from "../../../store/chat/chat.selector";
import { useEffect, useState } from "react";
import { fetchMessagesAsync } from "../../../store/chat/chat.action";
import { selectCurrentUser } from "../../../store/user/user.selector";
import Message from "../message/message";

const ChatBody = () => {

    const BgUrl = process.env.REACT_APP_CHAT_BACKGROUND
    const { activeConversation, messages } = useSelector(selectChat)
    const { accessToken, _id: userId } = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMessagesAsync(accessToken, activeConversation._id))
    },[activeConversation])

    useEffect(() => {

    },[])

    return (
        <Component BgUrl={BgUrl}>
            <Container>
                {
                    messages && messages.map(m => {
                        return (
                            <Message key={m._id} message={m} me={m.sender === userId}/>
                        )
                    })
                }

            </Container>
        </Component>
    )
}

export default ChatBody