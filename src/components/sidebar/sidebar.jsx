import SidebarHeader from "./header/sidebarHeader";
import Notification from "./notification/notification";
import Search from "./search/search";
import { StyledSidebar } from "./sidebar.style";
import Button from '../button/button'
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { fetchConversationsAsync } from "../../store/chat/chat.action";
import { selectChat } from "../../store/chat/chat.selector";
import Conversations from "./conversations/conversations";
import { useEffect } from "react";

const Sidebar = () => {

    const { accessToken } = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchConversationsAsync(accessToken))
    },[accessToken])

    return (
        <StyledSidebar>
            <SidebarHeader />
            <Notification />
            <Search /> 
            <Conversations/>
        </StyledSidebar>
    )
}

export default Sidebar