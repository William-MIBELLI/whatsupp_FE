import { Component, MenuItem } from "./menu.style";
import SecondaryText from '../../secondary-text/secondaryText'
import { useDispatch } from "react-redux";
import { logoutOutUser } from "../../../store/user/user.action";

const Menu = ({ blurHandler }) => {

    const dispatch = useDispatch()

    const onLogouthandler = () => {
        dispatch(logoutOutUser())
    }

    return (
        <Component onMouseLeave={blurHandler}>
            <MenuItem>
                <SecondaryText>New group</SecondaryText>
            </MenuItem>
            <MenuItem>
                <SecondaryText>New community</SecondaryText>
            </MenuItem>
            <MenuItem>
                <SecondaryText>Starred messaged</SecondaryText>
            </MenuItem>
            <MenuItem>
                <SecondaryText>Settings</SecondaryText>
            </MenuItem>
            <MenuItem onClick={onLogouthandler}>
                <SecondaryText>Logout</SecondaryText>
            </MenuItem>
        </Component>
    )
}

export default Menu