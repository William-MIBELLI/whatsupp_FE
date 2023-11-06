import { Component, MenuItem } from "./menu.style";
import SecondaryText from '../../secondary-text/secondaryText'
import { useDispatch } from "react-redux";
import { logoutOutUser } from "../../../store/user/user.action";
import { clearChat } from "../../../store/chat/chat.action";
import { useContext } from "react";
import { CreateNewGroupContext } from "../sidebar";
import { Link } from "react-router-dom";

const Menu = ({ blurHandler }) => {

    const dispatch = useDispatch()
    const  { setCreateNewGroup }  = useContext(CreateNewGroupContext)


    const onLogouthandler = () => {
        dispatch(clearChat())
        dispatch(logoutOutUser())
    }

    const onCreateGroupHandler = () => {
        setCreateNewGroup(true)
    }

    return (
        <Component onMouseLeave={blurHandler}>
            <MenuItem onClick={onCreateGroupHandler}>
                <SecondaryText>New group</SecondaryText> 
            </MenuItem>
            {/* <MenuItem>
                <SecondaryText>New community</SecondaryText>
            </MenuItem>
            <MenuItem>
                <SecondaryText>Starred messaged</SecondaryText>
                onClick={() => setDisplaySettings(true)}
            </MenuItem> */}
            <Link to={'settings'}>
                <MenuItem >
                    <SecondaryText>⚠️ Settings ⚠️</SecondaryText>
                </MenuItem>
            </Link>
            <MenuItem onClick={onLogouthandler}>
                <SecondaryText>Logout</SecondaryText>
            </MenuItem>
        </Component>
    )
}

export default Menu