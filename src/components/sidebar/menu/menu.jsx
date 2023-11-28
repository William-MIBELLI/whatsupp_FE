import { Component, MenuItem } from "./menu.style";
import SecondaryText from '../../secondary-text/secondaryText'
import { useDispatch, useSelector } from "react-redux";
import { logoutOutUser } from "../../../store/user/user.action";
import { clearChat } from "../../../store/chat/chat.action";
import { useContext } from "react";
import { CreateNewGroupContext } from "../sidebar";
import { Link } from "react-router-dom";
import { SocketContext } from "../../../App";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { logoutUserOnServer } from '../../../service/api.service'

const Menu = ({ blurHandler }) => {

    const dispatch = useDispatch()
    const { setCreateNewGroup, setHide } = useContext(CreateNewGroupContext)
    const { socket } = useContext(SocketContext)
    const { _id: userId } = useSelector(selectCurrentUser)


    const onLogouthandler = async () => {
        await logoutUserOnServer()
        dispatch(clearChat())
        dispatch(logoutOutUser())
        socket.emit('user-logout', userId)
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
                <MenuItem onClick={() => setHide(true)}>
                    <SecondaryText>Settings</SecondaryText>
                </MenuItem>
            </Link>
            <MenuItem onClick={onLogouthandler}>
                <SecondaryText>Logout</SecondaryText>
            </MenuItem>
        </Component>
    )
}

export default Menu