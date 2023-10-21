import { useDispatch, useSelector } from "react-redux";
import { Component, InfoContainer, Side } from "./chatHeader.style";
import { selectChat } from "../../../store/chat/chat.selector";
import { getSender, parsePictureUrl } from "../../../utils/helper";
import { selectCurrentUser } from "../../../store/user/user.selector";
import ImageButton from "../../image-button/imageButton";
import PrimaryText from "../../primary-text/primaryText";
import SecondaryText from "../../secondary-text/secondaryText";
import {  DotsIcon, SearchLargeIcon, VideoIcon } from "../../../svg";
import { useContext } from "react";
import { SocketContext } from "../../../App";
import { sendCall } from "../../../store/call/call.action";

const ChatHeader = () => {

    const { activeConversation, onlineUsers } = useSelector(selectChat)
    const  currentUser  = useSelector(selectCurrentUser)
    const user = getSender(activeConversation, currentUser._id)
    const pictureUrl = parsePictureUrl(user.pictureUrl)
    const { socket } = useContext(SocketContext)
    const dispatch = useDispatch()

    //on envoie les infos des 2 users au socket pour le call
    const onVideoCall = () => {
        //console.log('call video')
        socket.emit('start call', { receiver: user, caller: currentUser })
        dispatch(sendCall(currentUser, user))
    }

    return (
        <Component>
            <Side>
                <ImageButton size={'55px'}>
                    <img src={pictureUrl} alt={user.name}></img>
                </ImageButton>
                <InfoContainer>
                    <PrimaryText>{user.name}</PrimaryText>
                    <SecondaryText>{onlineUsers.find(u => u.userId === user._id) ? 'Online' : ''}</SecondaryText>
                </InfoContainer>
            </Side>
            <Side>
                <ImageButton clickHandler={onVideoCall}>
                    <VideoIcon/>
                </ImageButton>
                <ImageButton>
                    <SearchLargeIcon/>
                </ImageButton>
                <ImageButton>
                    <DotsIcon/>
                </ImageButton>
            </Side>
        </Component>
    )
}

export default ChatHeader