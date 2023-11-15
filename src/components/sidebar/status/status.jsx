import { SendIcon } from "../../../svg";
import {
    Component,
    Container,
    Input,
    LeftSide,
    RightSide,
} from "./status.style";
import PrimaryText from "../../primary-text/primaryText";
import ImageButton from "../../image-button/imageButton";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectUser,
} from "../../../store/user/user.selector";
import { updateStatusAsync } from "../../../store/user/user.action";
import { PulseLoader } from "react-spinners";
import SecondaryText from "../../secondary-text/secondaryText";
import { ThemeContext } from "styled-components";

const Status = () => {
    const [newStatus, setNewStatus] = useState("");
    const { currentUser: user, isLoading } = useSelector(selectUser);
    const dispatch = useDispatch();
    const color = useContext(ThemeContext)
    
    //Gestion de l'input
    const onChangeHandler = (event) => {
        const { value } = event.target;
        setNewStatus(value);
    };

    //On submit sir luser clique sur le bouton envoi
    const onSendStatus = async () => {
        console.log("send status");
        const r = await dispatch(
            updateStatusAsync(user.accessToken, newStatus, user)
        );
        if (r) { //La requete est sucessfull, on reset l'input
            setNewStatus('')
        }
    };

    //On submit si luser clique sur Entree
    const onKeyDownHandler = async (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            onSendStatus();
        }
    };

    return (
        <Component>
            <Container>
                <LeftSide>
                    <PrimaryText>What's up today ?</PrimaryText>
                    <Input
                        placeholder="Change your status here"
                        name="status"
                        value={newStatus}
                        onChange={onChangeHandler}
                        onKeyDown={onKeyDownHandler}
                    />
                    <SecondaryText>Actual status : {user.status}</SecondaryText>
                </LeftSide>
                <RightSide>
                    {isLoading ? (
                        <PulseLoader size={6} color={color.text_1} />
                    ) : (
                        <ImageButton clickHandler={onSendStatus}>
                            <SendIcon />
                        </ImageButton>
                    )}
                </RightSide>
            </Container>
        </Component>
    );
};

export default Status;
