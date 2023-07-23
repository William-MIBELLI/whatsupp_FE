import { Logo } from "../../svg";
import { Component, Container } from "./homeDefault.style";
import SecondaryText from "../secondary-text/secondaryText";

const HomeDefault = () => {
    return (
        <Component>
            <Container>
                <Logo />
                <h1>Whats App</h1>
                <SecondaryText>Send and receive messages without keeping your phone online.</SecondaryText>
                <SecondaryText>Use Whats App on up to 4 linked devices and 1 phone at the same time.</SecondaryText>
            </Container>
        </Component>
    )
}

export default HomeDefault