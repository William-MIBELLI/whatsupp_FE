import { Container, Title, Header } from "./success.style";
import { Link } from "react-router-dom";
import PrimaryText from "../primary-text/primaryText";
import SecondaryText from "../secondary-text/secondaryText";
import { ConfirmIcon } from "../../svg";

const Success = ({ title, content, link, className, children }) => {
    return (
        <Container className={className}>
            <Header>
                <Title>{title}</Title>
                <ConfirmIcon />
            </Header>
            <SecondaryText>{content}</SecondaryText>
            {link && (
                <Link to={`/${link}`}>
                    <PrimaryText>Back to {link}</PrimaryText>
                </Link>
            )}
            {children}
        </Container>
    );
};

export default Success;
