import { useDispatch, useSelector } from "react-redux";
import { Container, StyledHome } from "./home.style";
import { selectUser } from "../../store/user/user.selector";
import Sidebar from "../../components/sidebar/sidebar";
import { useContext, useEffect, useState, createContext, useRef } from "react";
import { SocketContext } from "../../App";
import {
    addTypingUser,
    fetchConversationsAsync,
    handleReceivedMessage,
    removeConversation,
    removeTypingUser,
    setOnlineUser,
    removeUser,
} from "../../store/chat/chat.action";

import { useStore } from "react-redux";
import Ringing from "../../components/call/ringing/ringing";
import CallContainer from "../../components/call/call-container/callContainer";
import { selectCall } from "../../store/call/call.selector";
import {
    acceptCall,
    callReceived,
    declineCall,
    setPartnerStream,
    sendCall,
    setAcceptedCall,
} from "../../store/call/call.action";
import { getMedia } from "../../utils/call.utils";
import SimplePeer from "simple-peer";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/footer";

export const CallContext = createContext(null);

const Home = () => {

    const store = useStore();
    const dispatch = useDispatch();
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate()

    const callData = useSelector(selectCall);
    const { currentUser } = useSelector(selectUser);

    const [call, setCall] = useState({});
    const [soundStatus, setSoundStatus] = useState(true)
    const [videoStatus, setVideoStatus] = useState(true)

    const streamRef = useRef();
    const connectionRef = useRef();
    const currentUserRef = useRef(currentUser)
    const firstConnection = useRef(true)


    useEffect(() => {
        setCall(callData);
    }, [callData]);

    //Emit user-connection socket UNIQUEMENT quand l'user se connecte
    useEffect(() => {
        if (currentUser._id !== currentUserRef.current._id || firstConnection.current) {
            firstConnection.current = false
            socket.emit("user-connection", currentUser._id);     
        }
    }, [currentUser]);

    //MESSAGE RECEIVED
    useEffect(() => {
        socket.on("receive-message", (message) => {
            const { chat } = store.getState();
            const existingConv = chat.conversations.find(
                (c) => c._id === message.conversation._id
            );
            if (existingConv) {
                dispatch(handleReceivedMessage(message, chat, currentUser._id));
                if (existingConv._id === chat.activeConversation?._id && chat.activeConversation?.isDisplayed) { 
                    //Le message est dans la activeConvo et elle est affichée, on reset unreadMsg dans la db
                    socket.emit('reset-unreadByUsers', { convoId: existingConv._id, userId: currentUser._id })
                }
            } else {
                dispatch(fetchConversationsAsync(currentUser.accessToken));
            }
        });

        return () => {  //Pour ne pas recevoir les messages en doublon quand luser se déco/reco
            socket.off('receive-message')
        }
    }, []);

    //On met a jour onlineUsers
    useEffect(() => {
        socket.on("online-users", (onlineUsers) => {
            dispatch(setOnlineUser(onlineUsers));
        });
    }, []);

    //Listen TYPING
    useEffect(() => {
        socket.on("typing", (convoId) => {
            const { chat } = store.getState();
            dispatch(addTypingUser(convoId, chat.typingUsers));
        });
    }, []);

    //Listen STOP TYPING
    useEffect(() => {
        socket.on("stop typing", (convoId) => {
            const { chat } = store.getState();
            dispatch(removeTypingUser(convoId, chat.typingUsers));
        });
    }, []);

    //Call RECEIVED
    useEffect(() => {
        socket.on("callIncoming", (caller, signalData) => {
            dispatch(callReceived(caller, signalData));
        });
    }, []);

    //call ENDED
    socket.on("callEnded", () => {
        dispatch(declineCall());
        streamRef?.current?.getTracks()?.forEach((t) => t.stop());
        setSoundStatus(true)
        setVideoStatus(true)
    });

    //USER DELETED
    useEffect(() => {
        socket.on('user-deleted', (data) => {
            const { convoId } = data
            const { chat } = store.getState();
            const { activeConversation, conversations } = chat;
            if (convoId === activeConversation?._id) {
                navigate('/home')
                dispatch(fetchConversationsAsync(currentUser.accessToken));
            } else {
                dispatch(removeConversation(conversations, convoId));
            }
        })
    },[])

    //GROUP DELETED
    useEffect(() => {
        socket.on("group deleted", (groupId) => {
            const { chat } = store.getState();
            const { activeConversation, conversations } = chat;
            if (groupId === activeConversation?._id) {
                navigate('/home')
                dispatch(fetchConversationsAsync(currentUser.accessToken));
            } else {
                dispatch(removeConversation(conversations, groupId));
            }
        });
    }, []);

    //Kicked from a group
    useEffect(() => {
        socket.on("get kicked from group", (groupId) => {
            const { chat } = store.getState();
            const { activeConversation, conversations } = chat;
            if (groupId === activeConversation._id) {
                navigate('/home')
            }
            dispatch(removeConversation(conversations, groupId));
        });
    }, []);

    //User kicked d'un group, on le supprime si c'est dans activeConvo
    useEffect(() => {
        socket.on("user got kicked", (data) => {
            const { groupId, userId } = data;
            const { chat } = store.getState();
            const { activeConversation } = chat;
            if (groupId === activeConversation._id) {
                dispatch(removeUser(userId, activeConversation));
            }
        });
    }, []);

    //Refuser l'appel
    const onDeclineCall = () => {
        const u =
            call.caller._id === currentUser._id ? call.receiver : call.caller;
        socket.emit("endCall", u);
        dispatch(declineCall());
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
        }
        connectionRef?.current?.destroy();
        setSoundStatus(true)
        setVideoStatus(true)
    };

    //Accepter l'appel
    const onAcceptCall = async () => {
        const stream = await getMedia();
        streamRef.current = stream;
        dispatch(acceptCall(stream));
        const peer = new SimplePeer({
            initiator: false,
            trickle: false,
            stream: streamRef.current,
        });

        peer.on("signal", (signal) => {
            socket.emit("acceptCall", {
                callerId: callData.caller._id,
                signal,
            });
        });

        peer.on("stream", (stream) => {
            dispatch(setPartnerStream(stream));
        });

        peer.on("close", () => {
            socket.off("callAccepted");
        });

        peer.signal(call?.partnerSignal);
        connectionRef.current = peer;
    };

    //LANCER UN APPEL
    const onVideoCall = async (user) => {

        if (call.isActive) {    // On vérifie si un appel est deja en cours
            return
        }

        const stream = await getMedia(); //On recuperr le stream de l'user et on le stocke dans streamRef
        streamRef.current = stream;

        const peer = new SimplePeer({
            //On crée un nouveau Peer
            initiator: true,
            trickle: false,
            stream: streamRef.current,
        });

        //On envoie les infos user et le signal au server
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                receiverId: user._id,
                caller: currentUser,
                signalData: data,
            });
            dispatch(sendCall(currentUser, user, data, stream));
        });

        peer.on("stream", (stream) => {
            dispatch(setPartnerStream(stream));
        });

        peer.on("close", () => {
            socket.off("callAccepted");
        });

        socket.on("callAccepted", (signal) => {
            dispatch(setAcceptedCall());
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    //Activer ou couper le son pendant l'appel
    const onHandleCallSound = () => {
        streamRef.current.getTracks()[0].enabled = !soundStatus
        setSoundStatus(!soundStatus)
    };

    //Activer ou couper la video pendant l'appel
    const onHandleCallVideo = () => {
        streamRef.current.getTracks()[1].enabled = !videoStatus
        setVideoStatus(!videoStatus)
    };

    return (
        <CallContext.Provider
            value={{
                onDeclineCall,
                onVideoCall,
                onHandleCallSound,
                onHandleCallVideo,
            }}
        >
            <StyledHome>
                <Container>
                    <Sidebar/>
                    <Outlet/>
                </Container>
                {call.isRinging && (
                    <Ringing
                        declineCall={onDeclineCall}
                        acceptCall={onAcceptCall}
                    />
                )}
                {call.isActive && <CallContainer />}
                <Footer/>
            </StyledHome>
        </CallContext.Provider>
    );
};

export default Home;
