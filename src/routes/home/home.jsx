import { useDispatch, useSelector } from "react-redux";
import { Container, StyledHome } from "./home.style";
import { selectUser } from "../../store/user/user.selector";
import Sidebar from "../../components/sidebar/sidebar";
import { selectChat } from "../../store/chat/chat.selector";
import HomeDefault from "../../components/home-default/homeDefault";
import ChatContainer from "../../components/chat/chat-container/chatContainer";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../App";
import {
    handleReceivedMessage,
    setOnlineUser,
} from "../../store/chat/chat.action";

import { useStore } from 'react-redux'

const Home = () => {
    const state = useSelector(selectChat);
    const store = useStore()
    const { currentUser } = useSelector(selectUser);
    const { socket } = useContext(SocketContext);
    const dispatch = useDispatch();

    //Emit user-connection socket
    useEffect(() => {
        socket.emit("user-connection", currentUser._id);
    }, [currentUser]);

    //Listen receive-message socket
    useEffect(() => {
        socket.on("receive-message", (message) => {
            const { chat } = store.getState()
            console.log('!!!!!!!!! USEFFECT MESAGE RECEIVED !!!!!!!!!!!!!!!')
            console.log(message)
            dispatch(handleReceivedMessage(message, chat));
        });
    }, []);

    //On met a jour onlineUsers
    useEffect(() => {
        socket.on("online-users", (onlineUsers) => {
            dispatch(setOnlineUser(onlineUsers));
        });
    }, []);

    return (
        <StyledHome>
            <Container>
                <Sidebar />
                {state.activeConversation ? <ChatContainer /> : <HomeDefault />}
            </Container>
        </StyledHome>
    );
};

export default Home;
