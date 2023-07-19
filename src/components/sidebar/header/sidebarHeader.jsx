import { useSelector } from "react-redux";
import { Component, Container, HomeButton, List } from "./sidebarHeader.style";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { CommunityIcon, StoryIcon, ChatIcon, DotsIcon } from '../../../svg'

const SidebarHeader = () => {

    const { pictureUrl } = useSelector(selectCurrentUser)

    return (
        <Component>
            <Container>
                <HomeButton>
                    <img src={pictureUrl} alt="profilepic"/>
                </HomeButton>
                <List>
                    <li>
                        <HomeButton>
                            <CommunityIcon/>
                        </HomeButton>
                    </li>
                    <li>
                        <HomeButton>
                            <StoryIcon/>
                        </HomeButton>
                    </li>
                    <li>
                        <HomeButton>
                            <ChatIcon/>
                        </HomeButton>
                    </li>
                    <li>
                        <HomeButton>
                            <DotsIcon/>
                        </HomeButton>
                    </li>
                </List>
            </Container>
        </Component>
    )
}

export default SidebarHeader