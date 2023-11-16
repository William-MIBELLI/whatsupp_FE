import { useDispatch, useSelector } from "react-redux";
import { getSender, handleDate } from "../../../utils/helper";
import {
    Badge,
    Component,
    ContactName,
    ImgContainer,
    InfoContainer,
    LastMessage,
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
import { SocketContext } from "../../../App";
import { useNavigate } from "react-router-dom";

const Conversation = ({ convoId }) => {

    const dispatch = useDispatch();
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    const { accessToken, _id: userId } = useSelector(selectCurrentUser);
    const { conversations, onlineUsers, activeConversation } = useSelector(selectChat);
    const convo = useSelector(selectConversationById(convoId));
    const typingUsers = useSelector(selectTypingUser)

    const { latestMessage, isGroup, name: groupName, pictureUrl: groupPicture, unreadByUsers } = convo;
    const sender = getSender(convo, userId);
    const pictureUrl = isGroup ? groupPicture : sender.pictureUrl;
    const [typing, setTyping] = useState(false)
    const [unreadMsg, setUnreadMsg] = useState(null)


    //Fetch la conversation en activeConversation
    const onClickHandler = async () => {
        const receiver_id = getReceiverId(convo.users, userId);
        //On emit stopTyping pour eviter certains cas où le typing saffiche sur la mauvaise convo
        if (activeConversation) {
            const { users } = activeConversation
            users.forEach(user => {
                socket.emit('stop typing', {conversationId: activeConversation._id, userId: user._id})   
            })
        }
        const r = await dispatch(
            fetchActiveConversationAsync(
                accessToken,
                receiver_id,
                conversations,
                convoId
            )
        );
        //Je pense que c'est inutile, à vérifier
        socket.emit('reset-unreadByUsers', {convoId, userId})
        if (r) {
            navigate('conversation')   
        }
    };

    //On récupère le msgCount dans redux
    useEffect(() => {
        const u = unreadByUsers.find(item => item.userId === userId)
        setUnreadMsg(u)
    },[unreadByUsers])

    useEffect(() => {
        const findTypingUser = typingUsers.includes(convoId)
        setTyping(findTypingUser)
    }, [typingUsers])

    return (
        <Component onClick={onClickHandler}>
            <LeftSide>
                <ImgContainer
                    isonline={onlineUsers.find(
                        (c) => c.userId === sender?._id || ""
                    )}
                >
                    <img style={{background: 'white'}} src={pictureUrl} alt={sender?.name}></img>
                </ImgContainer>
                <InfoContainer>
                    <ContactName>{isGroup ? groupName  : sender?.name}</ContactName>
                    {
                        typing ? 
                            <TypingText>
                                typing...
                            </TypingText>
                            :
                            <LastMessage>
                                {latestMessage?.message
                                    ? latestMessage?.message
                                    : sender.status}
                            </LastMessage>

                    }
                </InfoContainer>
            </LeftSide>
            <RightSide>
                {latestMessage?.createdAt
                    ? <p>{handleDate(latestMessage?.createdAt) }</p>
                    : ""}
                {
                    unreadMsg?.msgCount > 0 && <Badge>{unreadMsg?.msgCount > 9 ? '9+' : unreadMsg?.msgCount}</Badge>
                }
            </RightSide>
        </Component>
    );
};

export default Conversation;
