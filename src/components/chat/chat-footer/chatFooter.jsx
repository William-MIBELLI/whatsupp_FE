import { useDispatch, useSelector } from "react-redux";
import { AttachmentIcon, CloseIcon, EmojiIcon, SendIcon } from "../../../svg";
import ImageButton from "../../image-button/imageButton";
import {
    Component,
    Container,
    EmojiPickContainer,
    Input,
} from "./chatFooter.style";
import { useEffect, useRef, useState } from "react";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { selectChat } from "../../../store/chat/chat.selector";
import { sendMessageAsync } from "../../../store/chat/chat.action";
import EmojiPicker from "emoji-picker-react";
import Attachment from "../attachment/attachment";
import { useContext } from "react";
import { SocketContext } from "../../../App";

const ChatFooter = () => {
    const [message, setMessage] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const [showAttachment, setShowAttachment] = useState(false);
    const [cursorPosition, setCursorPosition] = useState("");
    const { accessToken } = useSelector(selectCurrentUser);
    const state = useSelector(selectChat);
    const typeRef = useRef();
    const { activeConversation } = state;
    const dispatch = useDispatch();
    const { socket } = useContext(SocketContext);


    //Envoi du message
    const onSendHandler = async (event) => {
        event.preventDefault();
        if (message.trim() === "") {
            return;
        }
        const res = await dispatch(
            sendMessageAsync(accessToken, state, {
                content: message,
                conversationId: activeConversation._id,
            })
        );
        socket.emit('send-message', res)
        setMessage("");
        setShowEmoji(false);
    };

    //Gestion de l'input
    const onChangeHandler = (event) => {
        const { value } = event.target;
        setMessage(value);
    };

    //Affichage du emoji picker
    const onEmojiDisplay = () => {
        setShowEmoji(!showEmoji);
        setShowAttachment(false);
    };

    //Affichage du menu fichier
    const onAttachmentDisplay = () => {
        setShowAttachment(!showAttachment);
        setShowEmoji(false);
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
            <Container>
                <ImageButton clickHandler={onEmojiDisplay}>
                    {showEmoji ? <CloseIcon /> : <EmojiIcon />}
                </ImageButton>
                <ImageButton clickHandler={onAttachmentDisplay}>
                    <AttachmentIcon />
                    {showAttachment && <Attachment />}
                </ImageButton>
                <Input
                    type="text"
                    value={message}
                    ref={typeRef}
                    onChange={onChangeHandler}
                    placeholder="Type your message..."
                />
                <ImageButton type="submit" clickHandler={onSendHandler}>
                    <SendIcon />
                </ImageButton>
            </Container>
        </Component>
    );
};

export default ChatFooter;
