import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../../service/api.service";
import { getSender, handleDate, parsePictureUrl } from "../../../utils/helper";
import PrimaryText from "../../primary-text/primaryText";
import SecondaryText from "../../secondary-text/secondaryText";
import { Component, ImgContainer, InfoContainer, LeftSide, RightSide } from "./conversation.style";
import { selectCurrentUser } from '../../../store/user/user.selector'
import { fetchActiveConversationAsync, fetchConversationsAsync } from "../../../store/chat/chat.action";
import { getReceiverId } from "../../../utils/helper";
import { selectChat, selectConversationById } from "../../../store/chat/chat.selector";
import { useEffect, useState } from "react";


const Conversation = ({ convoId }) => {

    const dispatch = useDispatch()
    const { accessToken, _id: userId } = useSelector(selectCurrentUser)
    const { conversations } = useSelector(selectChat)
    const convo = useSelector(selectConversationById(convoId))
    const { latestMessage } = convo
    const sender = getSender(convo.users, userId)
    const pictureUrl = parsePictureUrl(sender.pictureUrl)

    const onClickHandler = async () => {
        const receiver_id = getReceiverId(convo.users, userId)
        dispatch(fetchActiveConversationAsync(accessToken, receiver_id, conversations))
    }


    return (
        <Component onClick={onClickHandler}>
            <LeftSide>
                <ImgContainer>
                    <img src={pictureUrl} alt={sender?.name}></img>
                </ImgContainer>
                <InfoContainer>
                    <PrimaryText>{sender?.name}</PrimaryText>
                    <SecondaryText>{latestMessage?.message ? latestMessage?.message : sender.status }</SecondaryText>
                </InfoContainer>
            </LeftSide>
            <RightSide>
                {latestMessage?.createdAt ? handleDate(latestMessage?.createdAt) : ''}
            </RightSide>
        </Component>
    )
}

export default Conversation