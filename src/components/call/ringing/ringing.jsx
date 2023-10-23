import { Container, Description, PictureCaller } from "./ringing.style";
import { CallIcon, CloseIcon } from "../../../svg";
import ImageButton from "../../image-button/imageButton";
import { theme } from "../../../utils/theme";
import PrimaryText from "../../primary-text/primaryText";
import SecondaryText from "../../secondary-text/secondaryText";
import { useSelector } from "react-redux";
import { selectCall } from "../../../store/call/call.selector";

const Ringing = ({ declineCall, acceptCall }) => {

    const { red_1, green_1: green } = theme.color
    const { caller } = useSelector(selectCall)

    return (
        <Container>
            <PictureCaller src={caller?.pictureUrl} />
            <Description>
                <PrimaryText>{caller?.name}</PrimaryText>
                <SecondaryText>is calling you...</SecondaryText>
            </Description>
            <ImageButton bg={green} clickHandler={acceptCall}>
                <CallIcon/>
            </ImageButton>
            <ImageButton bg={red_1} clickHandler={declineCall}>
                <CloseIcon/>
            </ImageButton>
            <audio src="../../../../audio/ringtone.mp3" loop></audio>
        </Container>
    )
}

export default Ringing