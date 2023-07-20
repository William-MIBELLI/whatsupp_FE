import { handleDate } from "../../../utils/helper";
import { Component, ImgContainer, InfoContainer, LeftSide, RightSide, Text } from "./conversation.style";


const Conversation = ({ convo }) => {

    const { sender } = convo.latestMessage

    return (
        <Component>
            <LeftSide>
                <ImgContainer>
                    <img src={sender.pictureUrl} alt={sender.name}></img>
                </ImgContainer>
                <InfoContainer>
                    <Text primary={true}>{sender.name}</Text>
                    <Text>{convo.latestMessage.message }</Text>
                </InfoContainer>
            </LeftSide>
            <RightSide>
                {handleDate(convo.latestMessage.createdAt)}
            </RightSide>
        </Component>
    )
}

export default Conversation