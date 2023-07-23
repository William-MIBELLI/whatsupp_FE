import moment from "moment";
import { Component, Content, DateContainer } from "./message.style";

const Message = ({ message, me }) => {

    return (
        <Component me={me}>
            <Content>
                {message.message}
            </Content>
            <DateContainer>
                {moment(message.createdAt).format('HH:mm')}
            </DateContainer>
        </Component>
    )
}

export default Message