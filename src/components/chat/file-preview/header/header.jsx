import { CloseButton, Component } from "./header.style";
import { CloseIcon } from '../../../../svg/index'
import { useDispatch } from "react-redux";
import { clearFiles } from "../../../../store/chat/chat.action";

const Header = ({ name }) => {

    const dispatch = useDispatch()

    const onCloseHandler = () => {
        dispatch(clearFiles())
    }

    return (
        <Component>
            <CloseButton onClick={onCloseHandler}>
                <CloseIcon/>
            </CloseButton>
            {/* {name} */}
        </Component>
    )
}

export default Header