import { useDispatch, useSelector } from "react-redux";
import { Component, Container, EndDiv } from "./chatBody.style";
import { selectChat, selectFiles, selectTypingUser } from "../../../store/chat/chat.selector";
import { useContext, useEffect, useRef, useState } from "react";
import { fetchMessagesAsync } from "../../../store/chat/chat.action";
import { selectCurrentUser } from "../../../store/user/user.selector";
import Message from "../message/message";
import { SocketContext } from "../../../App";
import FilePreview from "../file-preview/filePreview";

const ChatBody = () => {
    //const BgUrl = process.env.REACT_APP_CHAT_BACKGROUND;
    const { activeConversation, messages } = useSelector(selectChat);
    const endRef = useRef();
    const { accessToken, _id: userId } = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const { socket } = useContext(SocketContext);
    const typingUsers = useSelector(selectTypingUser)
    const [typing, setTyping] = useState(false)
    const files = useSelector(selectFiles)
    const [displayFiles, setDisplayFiles] = useState(false)

    
    //fetch les messages de l'active conversation
    useEffect(() => {
        dispatch(fetchMessagesAsync(accessToken, activeConversation._id));
    }, [activeConversation]);

    //Connecte l'user a la room dans socket
    useEffect(() => {
        socket.emit("join-conversation", activeConversation._id);
    }, [activeConversation]);


    // !!!!!    TODO       !!!!!!!!
    //Le scroll ne va pas jusqu'au bout

    //Scroll jusqu'au dernier message
    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: "smooth", block: 'end'  });
        //endRef.current.scrollTo({ bottom: '0', behavior: 'smooth'})
    }, [messages, typing]);

    //Check si l'user est en train de taper
    useEffect(() => {
        const findTypingUser = typingUsers.includes(activeConversation._id)
        setTyping(findTypingUser)
    }, [typingUsers])

    useEffect(() => {
        setDisplayFiles(files.length !== 0)
    },[files])

    return (
        <Component>
            <Container>
                {messages &&
                    messages.map((m) => {
                        return (
                            <Message
                                key={m._id}
                                message={m}
                                me={m.sender._id === userId}
                                sender={m.sender}
                                isGroup={activeConversation.isGroup}
                            />
                        );
                    })}
                {
                    typing ? <Message
                                key={1}
                                message={{message: 'Is typing ....'}}
                                me={false}
                            /> : ''
                }
                <EndDiv ref={endRef}></EndDiv>
            </Container>
            {
                files.length > 0 && <FilePreview/>
            }
        </Component>
    );
};

export default ChatBody;
