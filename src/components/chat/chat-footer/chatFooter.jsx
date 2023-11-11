import { useDispatch, useSelector } from "react-redux";
import { CloseIcon, EmojiIcon, SendIcon } from "../../../svg";
import ImageButton from "../../image-button/imageButton";
import {
    Component,
    Container,
    EmojiPickContainer,
    Input,
} from "./chatFooter.style";
import { useEffect, useRef, useState } from "react";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { selectChat, selectFiles } from "../../../store/chat/chat.selector";
import { clearFiles, sendMessageAsync } from "../../../store/chat/chat.action";
import EmojiPicker from "emoji-picker-react";
import { useContext } from "react";
import { SocketContext } from "../../../App";
import FileInput from "../file-input/fileInput";
import {  PulseLoader } from "react-spinners";
import { getSender } from "../../../utils/helper";

const ChatFooter = () => {

    const [message, setMessage] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const [cursorPosition, setCursorPosition] = useState("");
    const { accessToken, _id: currentUserID } = useSelector(selectCurrentUser);
    const [typing, setTyping] = useState(false)
    const state = useSelector(selectChat);
    const files = useSelector(selectFiles)
    const typeRef = useRef();
    const { activeConversation, isLoading } = state;
    const { users } = activeConversation
    const [userIdToNOtif, setUSerIdToNotif] = useState()
    const dispatch = useDispatch();
    const { socket } = useContext(SocketContext);
    const lastTimeTyping = useRef()
    
    //On récupère l'id de luser a notifer pour le typing
    useEffect(() => {
        if (users && currentUserID) {
            const id = users[0]?._id === currentUserID ? users[1]?._id : users[0]?._id
            setUSerIdToNotif(id)
        }
    }, [state])



    //Envoi du message
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if ((message.trim() === "" && files.length <= 0) || isLoading) {
            return;
        }
        const res = await dispatch(
            sendMessageAsync(accessToken, state, {
                content: message,
                conversationId: activeConversation._id
            }, files)
        );
        if (res) {
            socket.emit('send-message', res)  
        }
        setMessage("");
        setShowEmoji(false);
        setTyping(false);
        dispatch(clearFiles())
    };

    //Gestion de l'input et du typing
    const onChangeHandler = (event) => {
        const { value } = event.target;
        setMessage(value);
        setTyping(true)
        lastTimeTyping.current = Date.now()
        const timer = 3000;
        setTimeout(() => {
            const now = Date.now()
            const diff = now - lastTimeTyping.current
            if (diff >= timer) {
                setTyping(false)
            }
        },timer)
    };

    //Affichage du emoji picker
    const onEmojiDisplay = () => {
        setShowEmoji(!showEmoji);
    };

    //Selection d'un emoji
    const onEmojiCLickHandler = (data, e) => {
        const ref = typeRef.current;
        ref.focus();
        const start = message.substring(0, ref.selectionStart);
        const end = message.substring(ref.selectionStart);
        const newMessage = start + data.emoji + end;
        setMessage(newMessage);
        setCursorPosition(start.length + data.emoji.length);
    };

    //Mise à jour de la position du curseur apres la selection d'un emoji
    useEffect(() => {
        typeRef.current.selectionEnd = cursorPosition;
    }, [cursorPosition]);

    //emit du status typing
    useEffect(() => {
        if (typing) {
            socket.emit('typing', {conversationId: activeConversation._id, userId: userIdToNOtif})
        } else {
            socket.emit('stop typing', {conversationId: activeConversation._id, userId: userIdToNOtif})
        }
    },[typing])

    return (
        <Component>
            {showEmoji && (
                <EmojiPickContainer>
                    <EmojiPicker
                        onEmojiClick={onEmojiCLickHandler}
                        width={"100%"}
                        emojiStyle="twitter"
                        theme="dark"
                    />
                </EmojiPickContainer>
            )}
            <Container encType="multipart/form-data" onSubmit={onSubmitHandler}>
                <ImageButton clickHandler={onEmojiDisplay}>
                    {showEmoji ? <CloseIcon /> : <EmojiIcon />}
                </ImageButton>
                    <FileInput/>
                <Input
                    type="text"
                    value={message}
                    ref={typeRef}
                    onChange={onChangeHandler}
                    placeholder="Type your message..."
                />
                {
                    isLoading ? (
                        <PulseLoader
                            size={6}
                            color='white'
                        />
                    ) : (
                        <ImageButton type="submit">
                            <SendIcon />
                        </ImageButton>
                            
                    )
                }
            </Container>
        </Component>
    );
};

export default ChatFooter;
