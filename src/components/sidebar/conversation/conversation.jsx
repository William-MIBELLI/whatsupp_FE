import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../../service/api.service";
import { getSender, handleDate, parsePictureUrl } from "../../../utils/helper";
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
    fetchActiveConversationAsync,
    fetchConversationsAsync,
} from "../../../store/chat/chat.action";
import { getReceiverId } from "../../../utils/helper";
import {
    selectChat,
    selectConversationById,
    selectTypingUser,
} from "../../../store/chat/chat.selector";
import { useEffect, useState } from "react";

const Conversation = ({ convoId }) => {
    const dispatch = useDispatch();
    const { accessToken, _id: userId } = useSelector(selectCurrentUser);
    const { conversations, onlineUsers } = useSelector(selectChat);
    const convo = useSelector(selectConversationById(convoId));
    const { latestMessage, isGroup, name: groupName, pictureUrl: groupPicture } = convo;
    const sender = getSender(convo, userId);
    const pictureUrl = parsePictureUrl(sender.pictureUrl);
    const typingUsers = useSelector(selectTypingUser)
    const [typing, setTyping] = useState(false)

    //Fetch la conversation en activeConversation
    const onClickHandler = async () => {
        console.log('on clique sur la convo pour lafficher : ', convo, convoId)
        const receiver_id = getReceiverId(convo.users, userId);
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
                    <img style={{background: 'white'}} src={isGroup ? parsePictureUrl(groupPicture) : pictureUrl} alt={sender?.name}></img>
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
