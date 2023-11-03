import { useDispatch, useSelector } from "react-redux";
import { Container, MenuItem } from "./chatMenu.style";
import { selectChat } from "../../../store/chat/chat.selector";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { deleteGroupOnDb, leaveGroupOnDb } from "../../../service/api.service";
import { fetchConversationsAsync, removeActiveConversation } from "../../../store/chat/chat.action";

const ChatMenu = ({ setDisplayMenu }) => {

    const { activeConversation } = useSelector(selectChat)
    const currentUser = useSelector(selectCurrentUser)
    const { accessToken } = currentUser
    const { isGroup, admin, _id: groupId } = activeConversation
    const dispatch = useDispatch()

    const onDeleteGroupHandler = async () => {
        deleteGroupOnDb(accessToken, groupId, currentUser._id)
    }

    const onRemoveUserHandler = () => {
        console.log('remove user')
    }

    const onAddUserHandler = () => {
        console.log('add user')
    }

    const onLeaveGroupHandler = async () => {
        const res = await leaveGroupOnDb(accessToken, groupId)
        if (!res) {
            return
        }
        dispatch(removeActiveConversation())
        dispatch(fetchConversationsAsync(accessToken))
    }

    const onMouseLeaveHandler = () => {
        setDisplayMenu(false)
    }

    return (
        <Container onMouseLeave={onMouseLeaveHandler}>
            {
                !isGroup ? (
                    <p>No options available</p>
                ) : (
                        admin === currentUser._id ? (
                            <div>
                                <MenuItem onClick={onDeleteGroupHandler}>Delete the group 😢</MenuItem>
                                <MenuItem onClick={onRemoveUserHandler}>Remove users</MenuItem>
                                <MenuItem onClick={onAddUserHandler}>Add user</MenuItem>
                            </div>
                        ): (
                                <MenuItem onClick={onLeaveGroupHandler}>Leave the group</MenuItem>
                        )
                )      
            }
        </Container>
    )
}

export default ChatMenu