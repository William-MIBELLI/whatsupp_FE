import { useDispatch, useSelector } from "react-redux";
import { AttachmentIcon, CloseIcon, EmojiIcon, SendIcon } from "../../../svg";
import ImageButton from "../../image-button/imageButton";
import { Component, Container, EmojiPickContainer, Input } from "./chatFooter.style";
import { useState } from "react";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { selectChat } from "../../../store/chat/chat.selector";
import { sendMessageAsync } from "../../../store/chat/chat.action";
import EmojiPicker from "emoji-picker-react";

const ChatFooter = () => {
    const [message, setMessage] = useState("");
    const [showEmoji, setShowEmoji] = useState(false)
    const { accessToken } = useSelector(selectCurrentUser);
    const state = useSelector(selectChat);
    const { activeConversation } = state
    const dispatch = useDispatch()

    const onSendHandler = async (event) => {
        event.preventDefault();
        dispatch(sendMessageAsync(accessToken, state, {
            content: message,
            conversationId: activeConversation._id,
        }));
        setMessage("");
    };
    const onChangeHandler = (event) => {
        const { value } = event.target;
        setMessage(value);
    };

    const onEmojiClick = () => {
        setShowEmoji(!showEmoji)
    }

    return (
        <Component>
            {
                showEmoji && (
                    <EmojiPickContainer>
                        <EmojiPicker width={'100%'} theme="dark"/>
                    </EmojiPickContainer>
                )
            }
            <Container>
                <ImageButton clickHandler={onEmojiClick}>
                    {
                        showEmoji ? <CloseIcon/> : <EmojiIcon />
                    }
                </ImageButton>
                <ImageButton>
                    <AttachmentIcon />
                </ImageButton>
                <Input
                    type="text"
                    value={message}
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
