import { useSelector } from "react-redux";
import { Component, Container, HomeButton, List } from "./sidebarHeader.style";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { CommunityIcon, StoryIcon, ChatIcon, DotsIcon } from "../../../svg";
import { useContext, useEffect, useState } from "react";
import Menu from "../menu/menu";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { SelectThemeContext } from "../../../App";

const SidebarHeader = () => {
    const { pictureUrl } = useSelector(selectCurrentUser);
    const [displayMenu, setDisplayMenu] = useState(false);
    const navigate = useNavigate();
    const { theme, setTheme } = useContext(SelectThemeContext)

    //gestion de l'affichage du menu
    const onBlurHandler = () => {
        console.log("blur sidebarheader");
        setDisplayMenu(false);
    };

    const onProfileClick = () => {
        navigate("/settings");
    };

    const handleChange = (checked) => {
        setTheme(checked);
    };

    useEffect(() => {
        console.log("theme : ", theme);
    }, [theme]);

    useEffect(() => {
        console.log('themeconetxet : ', theme)
    },[])

    return (
        <Component onMouseLeave={onBlurHandler}>
            <Container>
                <HomeButton onClick={onProfileClick}>
                    <img src={pictureUrl} alt="profilepic" />
                </HomeButton>
                <List>
                    <li>
                        <HomeButton>
                            <Switch
                                onChange={handleChange}
                                checked={theme}
                                className="react-switch"
                                height={15}
                                width={30}
                            />
                        </HomeButton>
                    </li>
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
