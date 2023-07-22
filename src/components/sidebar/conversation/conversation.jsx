import { handleDate } from "../../../utils/helper";
import PrimaryText from "../../primary-text/primaryText";
import SecondaryText from "../../secondary-text/secondaryText";
import { Component, ImgContainer, InfoContainer, LeftSide, RightSide } from "./conversation.style";


const Conversation = ({ convo }) => {

    const { sender } = convo.latestMessage

    console.log(handleDate(convo.latestMessage.createdAt))

    return (
        <Component>
            <LeftSide>
                <ImgContainer>
                    <img src={sender.pictureUrl} alt={sender.name}></img>
                </ImgContainer>
                <InfoContainer>
                    <PrimaryText>{sender.name}</PrimaryText>
                    <SecondaryText>{convo.latestMessage.message }</SecondaryText>
                </InfoContainer>
            </LeftSide>
            <RightSide>
                {handleDate(convo.latestMessage.createdAt)}
            </RightSide>
        </Component>
    )
}

export default Conversation