import moment from "moment";
import { Component, Content, DateContainer } from "./message.style";
import FileMessage from "../file-message/fileMessage";

const Message = ({ message, me }) => {

    const { files } = message
    if (files.length > 0) {
        console.log('files dans message : ', files)   
    }

    return (
        <Component me={me}>
            <Content>
                {
                    files.length > 0 && files.map(f => {
                        return (
                            <FileMessage file={f} me={me}/>
                        )
                    })
                }
                {message.message}
            </Content>
            <DateContainer>
                {moment(message.createdAt).format('HH:mm')}
            </DateContainer>
        </Component>
    )
}

export default Message