import { useSelector } from "react-redux";
import { Component, Container, HomeButton, List } from "./sidebarHeader.style";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { ChatIcon, DotsIcon } from "../../../svg";
import {  useState } from "react";
import Menu from "../menu/menu";
import { useNavigate } from "react-router-dom";

const SidebarHeader = () => {
    const { pictureUrl } = useSelector(selectCurrentUser);
    const [displayMenu, setDisplayMenu] = useState(false);
    const navigate = useNavigate();

    //gestion de l'affichage du menu
    const onBlurHandler = () => {
        setDisplayMenu(false);
    };

    const onProfileClick = () => {
        navigate("/settings");
    };


    return (
        <Component onMouseLeave={onBlurHandler}>
            <Container>
                <HomeButton onClick={onProfileClick}>
                    <img src={pictureUrl} alt="profilepic" />
                </HomeButton>
                <List>
                    <li>
                        <HomeButton>
                            <ChatIcon />
                        </HomeButton>
                    </li>
                    <li>
                        <HomeButton
                            onClick={() => setDisplayMenu(!displayMenu)}
                        >
                            <DotsIcon />
                        </HomeButton>
                    </li>
                    {displayMenu && <Menu blurHandler={onBlurHandler} />}
                </List>
            </Container>
        </Component>
    );
};

export default SidebarHeader;
