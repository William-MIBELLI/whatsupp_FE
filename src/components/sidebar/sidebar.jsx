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
import { createContext, useContext } from "react";
import NewGroupSearch from "./new-group-search/newGroupSearch";

export const CreateNewGroupContext = createContext()

const Sidebar = ({ setDisplaySettings }) => {
    const { accessToken } = useSelector(selectCurrentUser);
    const [keyword, setKeyword] = useState('');
    const [searchResult, setSearchResult] = useState([])
    const dispatch = useDispatch();
    const [createNewGroup, setCreateNewGroup] = useState(false)

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
    }, [keyword])
    
    useEffect(() => {
    },[createNewGroup])

    return (
        <CreateNewGroupContext.Provider value={{setCreateNewGroup, createNewGroup, setDisplaySettings}}>
            <StyledSidebar>
                <SidebarHeader />
                <Notification />
                {
                    createNewGroup ? <NewGroupSearch /> : (
                        <>
                            <Search setKeyword={setKeyword} />
                            {keyword ? <SearchList result={searchResult} /> : <Conversations />}
                        </>
                    )
                }
            </StyledSidebar>
        </CreateNewGroupContext.Provider>
    );
};

export default Sidebar;
