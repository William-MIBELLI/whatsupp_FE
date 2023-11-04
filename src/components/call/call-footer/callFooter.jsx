import ImageButton from "../../image-button/imageButton";
import { Arrow, ArrowContainer, Container, Call, IconContainer } from "./callFooter.style";
import { useContext } from "react";
import { CallContext } from "../../../routes/home/home";
import { MuteIcon, NoVideoIcon } from "../../../svg";

const CallFooter = () => {

    const { onDeclineCall } = useContext(CallContext)

    return (
        <Container>
            <ArrowContainer>
                <Arrow />
            </ArrowContainer>
            <IconContainer>
                
                <ImageButton> 
                    <MuteIcon/>
                </ImageButton>

                <ImageButton>
                    <NoVideoIcon/>
                </ImageButton>

                <ImageButton  clickHandler={onDeclineCall}>
                    <Call/>
                </ImageButton>
               

            </IconContainer>
        </Container>
    )
}

export default CallFooter