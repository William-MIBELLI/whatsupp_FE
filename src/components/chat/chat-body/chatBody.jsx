import { useDispatch, useSelector } from "react-redux";
import { Component, Container, EndDiv } from "./chatBody.style";
import { selectChat } from "../../../store/chat/chat.selector";
import { useEffect, useRef, useState } from "react";
import { fetchMessagesAsync } from "../../../store/chat/chat.action";
import { selectCurrentUser } from "../../../store/user/user.selector";
import Message from "../message/message";

const ChatBody = () => {

    const BgUrl = process.env.REACT_APP_CHAT_BACKGROUND
    const { activeConversation, messages } = useSelector(selectChat)
    const endRef = useRef()
    const { accessToken, _id: userId } = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMessagesAsync(accessToken, activeConversation._id))
    },[activeConversation])

    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: 'smooth'})
    },[messages])

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
            <EndDiv ref={endRef}></EndDiv>
            </Container>
        </Component>
    )
}

export default ChatBody