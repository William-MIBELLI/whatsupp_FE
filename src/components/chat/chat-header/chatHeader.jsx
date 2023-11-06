import { useDispatch, useSelector } from "react-redux";
import { Component, InfoContainer, Side } from "./chatHeader.style";
import { selectChat } from "../../../store/chat/chat.selector";
import { getSender } from "../../../utils/helper";
import { selectCurrentUser } from "../../../store/user/user.selector";
import ImageButton from "../../image-button/imageButton";
import PrimaryText from "../../primary-text/primaryText";
import SecondaryText from "../../secondary-text/secondaryText";
import {  DotsIcon, SearchLargeIcon, VideoIcon } from "../../../svg";
import { useContext, useState } from "react";
import { SocketContext } from "../../../App";
import { declineCall, sendCall, setPartnerStream } from "../../../store/call/call.action";
import SimplePeer from "simple-peer";
import { getMedia } from "../../../utils/call.utils";
import ChatMenu from "../chat-menu/chatMenu";
import { CallContext } from "../../../routes/home/home";

const ChatHeader = () => {

    const { activeConversation, onlineUsers } = useSelector(selectChat)
    const { isGroup, users, pictureUrl: groupPicture, name: groupName } = activeConversation
    const  currentUser  = useSelector(selectCurrentUser)
    const user = getSender(activeConversation, currentUser._id) 
    const pictureUrl = user.pictureUrl
    const { socket } = useContext(SocketContext)
    const [displayMenu, setDisplayMenu] = useState(false)
    const dispatch = useDispatch()
    const { onVideoCall } = useContext(CallContext)



    //Gère l'affichage du menu
    const onMenuClick = () => {
        setDisplayMenu(!displayMenu)
    }


    return (
        <Component>
            <Side>
                <ImageButton size={'55px'}>
                    <img style={{ background: 'white'}} src={ isGroup ? groupPicture : pictureUrl} alt={user.name}></img>
                </ImageButton>
                <InfoContainer>
                    <PrimaryText>{isGroup ? groupName : user.name}</PrimaryText>
                    {
                        isGroup && <div>
                            {
                                users.map(user => <span style={{color: 'grey', fontSize: '0.7rem'}}>{ user.name} </span>)
                            }
                        </div> 
                    }
                    <SecondaryText>{onlineUsers.find(u => u.userId === user._id) ? 'Online' : ''}</SecondaryText>
                </InfoContainer>
            </Side>
            <Side>
                {
                    !isGroup && (
                        <ImageButton clickHandler={() => onVideoCall(user)}>
                            <VideoIcon/>
                        </ImageButton>
                    )
                }
                {/* <ImageButton>
                    <SearchLargeIcon/>
                </ImageButton> */}
                <ImageButton clickHandler={onMenuClick}>
                    <DotsIcon/>
                </ImageButton>
            </Side>
            {
                displayMenu && (
                    <ChatMenu setDisplayMenu={setDisplayMenu} />
                )
            }
        </Component>
    )
}

export default ChatHeader