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
    handleReceivedMessage,
    removeTypingUser,
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
            dispatch(handleReceivedMessage(message, chat));
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
