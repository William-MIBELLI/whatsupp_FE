import SidebarHeader from "./header/sidebarHeader";
import Notification from "./notification/notification";
import Search from "./search/search";
import { StyledSidebar } from "./sidebar.style";

const Sidebar = () => {
    return (
        <StyledSidebar>
            <SidebarHeader />
            <Notification />
            <Search/>
        </StyledSidebar>
    )
}

export default Sidebar