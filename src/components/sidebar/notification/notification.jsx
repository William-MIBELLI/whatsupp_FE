import { CloseIcon, NotificationIcon } from "../../../svg";
import { Component, Container, LeftSide, RightSide, TextContainer } from "./notification.style";
import PrimaryText from "../../primary-text/primaryText";
import SecondaryText from "../../secondary-text/secondaryText";

const Notification = () => {
    return (
        <Component>
            <Container>
                <LeftSide>
                    <NotificationIcon />
                    <TextContainer>
                        <PrimaryText>Get notified of new messages</PrimaryText>
                        <SecondaryText>Turn on dekstop notifications</SecondaryText>
                    </TextContainer>
                </LeftSide>
                <RightSide>
                    <CloseIcon/>
                </RightSide>
            </Container>
        </Component>
    )
}

export default Notification