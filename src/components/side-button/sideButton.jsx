import { ArrowIcon } from "../../svg";
import { Container } from "./sideButton.style";

const SideButton = ({ clickHandler, hide }) => {
    return (
        <Container $hide={hide} onClick={clickHandler}>
            <ArrowIcon />
        </Container>
    )
}

export default SideButton