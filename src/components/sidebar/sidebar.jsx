import SidebarHeader from "./header/sidebarHeader";
import Search from "./search/search";
import { Component, StyledSidebar } from "./sidebar.style";
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
import Status from "./status/status";
import SideButton from "../side-button/sideButton";

export const CreateNewGroupContext = createContext()

const Sidebar = () => {
    const { accessToken } = useSelector(selectCurrentUser);
    const [keyword, setKeyword] = useState('');
    const [searchResult, setSearchResult] = useState([])
    const dispatch = useDispatch();
    const [createNewGroup, setCreateNewGroup] = useState(false)
    const [ hide, setHide] = useState(true)

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
    }, [createNewGroup])
    
    const onSideButtonClick = () => {
        setHide(!hide)
    }

    return (
        <CreateNewGroupContext.Provider value={{ setCreateNewGroup, createNewGroup, setHide }}>
            <Component $hide={hide}>
                <StyledSidebar >
                    <SidebarHeader />
                    <Status/>
                    {
                        createNewGroup ? <NewGroupSearch /> : (
                            <>
                                <Search setKeyword={setKeyword} />
                                {keyword ? <SearchList result={searchResult} setKeyword={setKeyword} /> : <Conversations />}
                            </>
                        )
                    }
                </StyledSidebar>
                {

                }
                <SideButton hide={hide} clickHandler={onSideButtonClick}/>
            </Component>
        </CreateNewGroupContext.Provider>
    );
};

export default Sidebar;
