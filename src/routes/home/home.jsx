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
    addTypingUser,
    fetchConversationsAsync,
    handleReceivedMessage,
    removeConversation,
    removeTypingUser,
    removeActiveConversation,
    setOnlineUser,
} from "../../store/chat/chat.action";

import { useStore } from 'react-redux'
import Ringing from "../../components/call/ringing/ringing";
import CallContainer from "../../components/call/call-container/callContainer";
import { selectCall } from "../../store/call/call.selector";
import { acceptCall, callReceived, declineCall, setPartnerStream } from "../../store/call/call.action";
import { getMedia } from "../../utils/call.utils";
import SimplePeer from "simple-peer";


const Home = () => {
    const state = useSelector(selectChat);
    const store = useStore()
    const { currentUser } = useSelector(selectUser);
    const { socket } = useContext(SocketContext);
    const dispatch = useDispatch();
    const [call, setCall] = useState({})
    const callData = useSelector(selectCall)

    useEffect(() => {
        setCall(callData)
    },[callData])

    //Emit user-connection socket
    useEffect(() => {
        socket.emit("user-connection", currentUser._id);
    }, [currentUser]);

    //Listen receive-message socket
    useEffect(() => {
        socket.on("receive-message", (message) => {
            const { chat } = store.getState()
            console.log('message dans socket : ', message)
            const existingConv = chat.conversations.find(c => c._id === message.conversation._id)
            if (existingConv) {
                console.log('la convo existe, on ajoute le message')
                dispatch(handleReceivedMessage(message, chat));         
            } else {
                console.log('la convo nexiste pas, on fetch depuis le server')
                dispatch(fetchConversationsAsync(currentUser.accessToken))
            }
        });
    }, []);

    //On met a jour onlineUsers
    useEffect(() => {
        socket.on("online-users", (onlineUsers) => {
            dispatch(setOnlineUser(onlineUsers));
        });
    }, []);

    //Listen TYPING
    useEffect(() => {
        socket.on('typing', convoId => {
            const { chat } = store.getState()
            dispatch(addTypingUser(convoId, chat.typingUsers))
        })
    }, [])
    
    //Listen STOP TYPING
    useEffect(() => {
        socket.on('stop typing', convoId => {
            const { chat } = store.getState();
            dispatch(removeTypingUser(convoId, chat.typingUsers))
        })
    }, [])
    
    //Call RECEIVED
    useEffect(() => {
        socket.on('call incoming', (caller, signalData) => {
            dispatch(callReceived(caller, signalData))
        })
    }, [])
    
    //GROUP DELETED
    useEffect(() => {
        socket.on('group deleted', (groupId) => {
            const { chat } = store.getState()
            const { activeConversation, conversations } = chat
            console.log(groupId, activeConversation)
            if (groupId === activeConversation?._id) {
                console.log('le group est en activeC, on fetch toutes les convs')
                dispatch(removeActiveConversation())
                dispatch(fetchConversationsAsync(currentUser.accessToken))
            } else {
                console.log('le group nest pas actif, on le supprime simplement du state')
                dispatch(removeConversation(conversations, groupId))
            }
        })
    },[])
    
    //Refuser l'appel
    const onDeclineCall = () => {
        socket.emit('end call', call.caller)
        dispatch(declineCall())
    }

    //Accepter l'appel
    const onAcceptCall = async () => {
        const stream = await getMedia()
        dispatch(acceptCall(stream))
        const peer = new SimplePeer({
            initiator: false,
            trickle: false,
            stream: stream
        })

        peer.on('signal', signal => {
            socket.emit('accept call', { caller: callData.caller, signal })
            
        })
        
        peer.on('stream', stream => {
            dispatch(setPartnerStream(stream))
        })
        peer.signal(call?.partnerSignal)

        socket.on('call ended', () => {
            console.log('peer destroy dans acceptcall')
            dispatch(declineCall())
            //peer.destroy()
        })
    }
    
    return (
        <StyledHome>
            <Container>
                <Sidebar />
                {state.activeConversation ? <ChatContainer /> : <HomeDefault />}
            </Container>
            {
                call.isRinging && <Ringing declineCall={onDeclineCall} acceptCall={onAcceptCall} />
            }
            {
                call.isActive && <CallContainer/>
            }
        </StyledHome>
    );
};

export default Home;
