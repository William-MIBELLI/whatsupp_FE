import SidebarHeader from "./header/sidebarHeader";
import Notification from "./notification/notification";
import Search from "./search/search";
import { StyledSidebar } from "./sidebar.style";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { fetchConversationsAsync } from "../../store/chat/chat.action";
import { selectChat } from "../../store/chat/chat.selector";
import Conversations from "./conversations/conversations";
import { useEffect, useState } from "react";
import SearchList from './search-list/searchList'
import { searchUserOnDb } from "../../service/api.service";

const Sidebar = () => {
    const { accessToken } = useSelector(selectCurrentUser);
    const [keyword, setKeyword] = useState('');
    const [searchResult, setSearchResult] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchConversationsAsync(accessToken));
    }, [accessToken]);

    useEffect(() => {
        const getUsers = async () => {
            const res = await searchUserOnDb(accessToken, keyword)
            setSearchResult(res)
        }
        if (keyword !== '') {
            getUsers()
        }
    },[keyword])

    return (
        <StyledSidebar>
            <SidebarHeader />
            <Notification />
            <Search setKeyword={setKeyword} />
            {keyword ? <SearchList result={searchResult} /> : <Conversations />}
        </StyledSidebar>
    );
};

export default Sidebar;
