import { useSelector } from "react-redux";
import { Component, Container, HomeButton, List } from "./sidebarHeader.style";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { CommunityIcon, StoryIcon, ChatIcon, DotsIcon } from "../../../svg";
import { useState } from "react";
import Menu from "../menu/menu";

const SidebarHeader = () => {
    const { pictureUrl } = useSelector(selectCurrentUser);
    const [displayMenu, setDisplayMenu] = useState(false);

    //gestion de l'affichage du menu
    const onBlurHandler = () => {
        setDisplayMenu(false);
    };

    return (
        <Component>
            <Container>
                <HomeButton>
                    <img src={pictureUrl} alt="profilepic" />
                </HomeButton>
                <List>
                    <li>
                        <HomeButton>
                            <CommunityIcon />
                        </HomeButton>
                    </li>
                    {/* <li>
                        <HomeButton>
                            <StoryIcon />
                        </HomeButton>
                    </li> */}
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
