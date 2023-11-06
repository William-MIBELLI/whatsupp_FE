import { useDispatch, useSelector } from "react-redux";
import { getSender, handleDate } from "../../../utils/helper";
import PrimaryText from "../../primary-text/primaryText";
import SecondaryText from "../../secondary-text/secondaryText";
import {
    Component,
    ImgContainer,
    InfoContainer,
    LeftSide,
    RightSide,
    TypingText
} from "./conversation.style";
import { selectCurrentUser } from "../../../store/user/user.selector";
import {
    fetchActiveConversationAsync
} from "../../../store/chat/chat.action";
import { getReceiverId } from "../../../utils/helper";
import {
    selectChat,
    selectConversationById,
    selectTypingUser,
} from "../../../store/chat/chat.selector";
import { useContext, useEffect, useState } from "react";
import { CreateNewGroupContext } from "../sidebar";
import { SocketContext } from "../../../App";

const Conversation = ({ convoId }) => {
    const dispatch = useDispatch();
    const { accessToken, _id: userId } = useSelector(selectCurrentUser);
    const { conversations, onlineUsers, activeConversation } = useSelector(selectChat);
    const convo = useSelector(selectConversationById(convoId));
    const { latestMessage, isGroup, name: groupName, pictureUrl: groupPicture } = convo;
    const sender = getSender(convo, userId);
    const pictureUrl = isGroup ? groupPicture : sender.pictureUrl;
    const typingUsers = useSelector(selectTypingUser)
    const [typing, setTyping] = useState(false)
    const { setDisplaySettings } = useContext(CreateNewGroupContext)
    const { socket } = useContext(SocketContext)

    //Fetch la conversation en activeConversation
    const onClickHandler = async () => {
        setDisplaySettings(false)
        const receiver_id = getReceiverId(convo.users, userId);
        //On emit stopTyping pour eviter certains cas où le typing saffiche sur la mauvaise convo
        if (activeConversation) {
            const { users } = activeConversation
            users.forEach(user => {
                socket.emit('stop typing', {conversationId: activeConversation._id, userId: user._id})   
            })
        }
        dispatch(
            fetchActiveConversationAsync(
                accessToken,
                receiver_id,
                conversations,
                convoId
            )
        );
    };

    useEffect(() => {
        const findTypingUser = typingUsers.includes(convoId)
        setTyping(findTypingUser)
    }, [typingUsers])

    return (
        <Component onClick={onClickHandler}>
            <LeftSide>
                <ImgContainer
                    isOnline={onlineUsers.find(
                        (c) => c.userId === sender?._id || ""
                    )}
                >
                    <img style={{background: 'white'}} src={pictureUrl} alt={sender?.name}></img>
                </ImgContainer>
                <InfoContainer>
                    <PrimaryText>{isGroup ? groupName  : sender?.name}</PrimaryText>
                    {
                        typing ? 
                            <TypingText>
                                typing...
                            </TypingText>
                            :
                            <SecondaryText>
                                {latestMessage?.message
                                    ? latestMessage?.message
                                    : sender.status}
                            </SecondaryText>

                    }
                </InfoContainer>
            </LeftSide>
            <RightSide>
                {latestMessage?.createdAt
                    ? handleDate(latestMessage?.createdAt)
                    : ""}
            </RightSide>
        </Component>
    );
};

export default Conversation;
