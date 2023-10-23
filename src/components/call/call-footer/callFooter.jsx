import { useDispatch, useSelector } from "react-redux";
import { MuteIcon, NoVideoIcon } from "../../../svg";
import ImageButton from "../../image-button/imageButton";
import { Arrow, ArrowContainer, Container, IconContainer, Call } from "./callFooter.style";
import { declineCall } from "../../../store/call/call.action";
import { useContext } from "react";
import { SocketContext } from "../../../App";
import { selectCall } from "../../../store/call/call.selector";
import { selectCurrentUser } from "../../../store/user/user.selector";

const CallFooter = () => {

    const dispatch = useDispatch()
    const {socket} = useContext(SocketContext)
    const { caller, receiver } = useSelector(selectCall)
    const { _id } = useSelector(selectCurrentUser)

    //Terminer l'appel
    const onCloseHandler = () => {
        const user = caller._id === _id ? receiver : caller
        socket.emit('end call', user)
        dispatch(declineCall())
    }

    return (
        <Container>
            <ArrowContainer>
                <Arrow/>
            </ArrowContainer>
            <IconContainer>
                
                <ImageButton>
                    <MuteIcon/>
                </ImageButton>

                <ImageButton>
                    <NoVideoIcon/>
                </ImageButton>

                <ImageButton clickHandler={onCloseHandler}>
                    <Call/>
                </ImageButton>

            </IconContainer>
        </Container>
    )
}

export default CallFooter