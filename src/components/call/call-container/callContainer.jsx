import { useState } from "react";
import CallBody from "../call-body/callBody";
import CallFooter from "../call-footer/callFooter";
import CallHeader from "../call-header/callHeader";
import { Container } from "./callContainer.style";

const CallContainer = ({ closeCall }) => {
    const bgUrl = process.env.REACT_APP_CHAT_BACKGROUND;
    const [showFooter, setShowFooter] = useState(false);

    return (
        <Container
            bg={bgUrl}
            onMouseEnter={() => setShowFooter(true)}
            onMouseLeave={() => setShowFooter(false)}
        >
            <CallHeader />
            <CallBody showFooter={showFooter} />
            {showFooter && <CallFooter />}
        </Container>
    );
};

export default CallContainer;
