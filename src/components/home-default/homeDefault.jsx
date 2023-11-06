import { Logo } from "../../svg";
import { Component, Container } from "./homeDefault.style";
import SecondaryText from "../secondary-text/secondaryText";

const HomeDefault = () => {

    

    return (
        <Component>
            <Container>
                <Logo />
                <h1>Whats App</h1>
                <SecondaryText>Send and receive messages, share your status and more !</SecondaryText>
                <SecondaryText>Look for people on search-bar, start chatting as duo or group.</SecondaryText>
                <SecondaryText>You can even make video call, try it out!</SecondaryText>
            </Container>
        </Component>
    )
}

export default HomeDefault