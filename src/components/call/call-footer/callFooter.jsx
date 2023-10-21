import { useDispatch } from "react-redux";
import { MuteIcon, NoVideoIcon } from "../../../svg";
import ImageButton from "../../image-button/imageButton";
import { Arrow, ArrowContainer, Container, IconContainer, Call } from "./callFooter.style";
import { declineCall } from "../../../store/call/call.action";

const CallFooter = () => {

    const dispatch = useDispatch()

    //Terminer l'appel
    const onCloseHandler = () => {
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