import { useSelector } from "react-redux";
import { Component, InfoContainer, Side } from "./chatHeader.style";
import { selectChat } from "../../../store/chat/chat.selector";
import { getSender, parsePictureUrl } from "../../../utils/helper";
import { selectCurrentUser } from "../../../store/user/user.selector";
import ImageButton from "../../image-button/imageButton";
import PrimaryText from "../../primary-text/primaryText";
import SecondaryText from "../../secondary-text/secondaryText";
import { DotsIcon, SearchLargeIcon } from "../../../svg";

const ChatHeader = () => {

    const { activeConversation } = useSelector(selectChat)
    const { _id: userId } = useSelector(selectCurrentUser)
    const user = getSender(activeConversation.users, userId)
    const pictureUrl = parsePictureUrl(user.pictureUrl)

    return (
        <Component>
            <Side>
                <ImageButton size={'55px'}>
                    <img src={pictureUrl} alt={user.name}></img>
                </ImageButton>
                <InfoContainer>
                    <PrimaryText>{user.name}</PrimaryText>
                    <SecondaryText>Online</SecondaryText>
                </InfoContainer>
            </Side>
            <Side>
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