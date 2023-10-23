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
import { declineCall, getStream, sendCall, setPartnerStream } from "../../../store/call/call.action";
import SimplePeer from "simple-peer";
import { selectCall } from "../../../store/call/call.selector";
import { getMedia } from "../../../utils/call.utils";

const ChatHeader = () => {

    const { activeConversation, onlineUsers } = useSelector(selectChat)
    const  currentUser  = useSelector(selectCurrentUser)
    const user = getSender(activeConversation, currentUser._id)
    const pictureUrl = parsePictureUrl(user.pictureUrl)
    const { socket } = useContext(SocketContext)
    const dispatch = useDispatch()
    const call = useSelector(selectCall)

   
    const onVideoCall = async () => {

        const stream = await getMedia() //On recuperr le stream de l'user

        const peer = new SimplePeer({   //On crée un nouveau Peer
            initiator: true,
            trickle: false,
            stream: stream
        })
        
        //On envoie les infos user et le signal au server 
        peer.on('signal', data => { 
            socket.emit('start call', { receiver: user, caller: currentUser, signalData: data })
            dispatch(sendCall(currentUser, user, data, stream))
        })
        
        peer.on('stream', stream => {
            console.log('stream event : ', stream)
            dispatch(setPartnerStream(stream))
        })

        socket.on('call accepted', signal => {
            peer.signal(signal)
        })

        socket.on('call ended', () => {
            console.log('peer destroy dans sencall')
            dispatch(declineCall())
            //peer.destroy()
        })
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