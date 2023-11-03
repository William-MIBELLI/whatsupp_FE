import { useDispatch, useSelector } from "react-redux";
import { Container, StyledHome } from "./home.style";
import { selectUser } from "../../store/user/user.selector";
import Sidebar from "../../components/sidebar/sidebar";
import { selectChat } from "../../store/chat/chat.selector";
import HomeDefault from "../../components/home-default/homeDefault";
import ChatContainer from "../../components/chat/chat-container/chatContainer";
import { useContext, useEffect, useState, createContext, useRef } from "react";
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

export const CallContext = createContext(null)


const Home = () => {
    const state = useSelector(selectChat);
    const store = useStore()
    const { currentUser } = useSelector(selectUser);
    const { socket } = useContext(SocketContext);
    const dispatch = useDispatch();
    const [call, setCall] = useState({})
    const callData = useSelector(selectCall)
    const streamRef = useRef()

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
            const existingConv = chat.conversations.find(c => c._id === message.conversation._id)
            if (existingConv) {
                dispatch(handleReceivedMessage(message, chat));         
            } else {
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
        socket.on('callIncoming', (caller, signalData) => {
            dispatch(callReceived(caller, signalData))
        })
    }, [])
    
    //GROUP DELETED
    useEffect(() => {
        socket.on('group deleted', (groupId) => {
            const { chat } = store.getState()
            const { activeConversation, conversations } = chat
            if (groupId === activeConversation?._id) {
                dispatch(removeActiveConversation())
                dispatch(fetchConversationsAsync(currentUser.accessToken))
            } else {
                dispatch(removeConversation(conversations, groupId))
            }
        })
    },[])
    
    //Refuser l'appel
    const onDeclineCall = () => {
        const u = call.caller._id === currentUser._id ? call.receiver : call.caller
        socket.emit('endCall', u)
        dispatch(declineCall())
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(t => t.stop())   
        }
    }

    //Accepter l'appel
    const onAcceptCall = async () => {
        const stream = await getMedia()
        streamRef.current = stream
        dispatch(acceptCall(stream))
        const peer = new SimplePeer({
            initiator: false,
            trickle: false,
            stream: streamRef.current
        })

        peer.on('signal', signal => {
            socket.emit('acceptCall', { callerId: callData.caller._id, signal })
            
        })
        
        peer.on('stream', stream => {
            dispatch(setPartnerStream(stream))
        })

        peer.on('close', () => {
            console.log('close stream dans home')
        })
        peer.signal(call?.partnerSignal)

        socket.on('callEnded', () => {
            dispatch(declineCall())
            streamRef.current.getTracks().forEach(t => t.stop())
        })
    }
    
    return (
        <CallContext.Provider value={{onDeclineCall}}>
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
        </CallContext.Provider>
    );
};

export default Home;
