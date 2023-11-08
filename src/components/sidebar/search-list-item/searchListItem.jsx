import SecondaryText from "../../secondary-text/secondaryText";
import PrimaryText from "../../primary-text/primaryText";
import { Component, InfoContainer, PictureContainer, Separator, Container } from "./searchListItem.style";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveConversationAsync } from "../../../store/chat/chat.action";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { selectChat } from "../../../store/chat/chat.selector";
import { useNavigate } from "react-router-dom";

const SearchListItem = ({ user, setKeyword }) => {

    const { name, status } = user
    const pictureUrl = user.pictureUrl
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { accessToken } = useSelector(selectCurrentUser)
    const { conversations } = useSelector(selectChat)

    const onClickHandler = async () => {
        await dispatch(fetchActiveConversationAsync(accessToken, user._id, conversations))
        setKeyword('')
        navigate('/conversation')
    }

    return (
        <Component onClick={onClickHandler}>
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