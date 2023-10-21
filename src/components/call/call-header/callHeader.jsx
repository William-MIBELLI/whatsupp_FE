import { ArrowIcon } from "../../../svg";
import { Arrow, ArrowContainer, Container, Lock, Title } from "./callheader.style";

const CallHeader = () => {
    return (
        <Container>
            <ArrowContainer>
                <Arrow/>
            </ArrowContainer>
            <Title>
                <Lock/>
                <p>End to End Encrypted</p>
            </Title>
        </Container>
    )
}

export default CallHeader