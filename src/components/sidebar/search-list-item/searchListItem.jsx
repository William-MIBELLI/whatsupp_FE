import { parsePictureUrl } from "../../../utils/helper";
import SecondaryText from "../../secondary-text/secondaryText";
import PrimaryText from "../../primary-text/primaryText";
import { Component, InfoContainer, PictureContainer, Separator, Container } from "./searchListItem.style";

const SearchListItem = ({ user }) => {

    const { name, status } = user
    const pictureUrl = parsePictureUrl(user.pictureUrl)

    return (
        <Component>
            <Container>
                <PictureContainer>
                    <img src={pictureUrl} alt={name} />
                </PictureContainer>
                <InfoContainer>
                    <PrimaryText>{name}</PrimaryText>
                    <SecondaryText>{status}</SecondaryText>
                </InfoContainer>
            </Container>
            <Separator/>
        </Component>
    )
}

export default SearchListItem