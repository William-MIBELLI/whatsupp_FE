import moment from "moment";
import { Component, Container, Content, DateContainer, SenderPic } from "./message.style";
import FileMessage from "../file-message/fileMessage";

const Message = ({ message, me, isGroup }) => {

    const { files } = message || []

    
    return (
        <Container>
            {
                (me === false && isGroup)  && <SenderPic src={message.sender.pictureUrl}/>
            }
            <Component $me={me}>
                <Content>
                    {
                        (files && files.length > 0) && files.map(f => {
                            return (
                                <FileMessage file={f} $me={me}/>
                            )
                        })
                    }
                    {message.message}
                </Content>
                <DateContainer>
                    {moment(message.createdAt).format('HH:mm')}
                </DateContainer>
            </Component>

        </Container>
    )
}

export default Message