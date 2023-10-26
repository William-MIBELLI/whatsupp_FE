import { useSelector } from "react-redux";
import { Container, MenuItem } from "./chatMenu.style";
import { selectChat } from "../../../store/chat/chat.selector";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { deleteGroupOnDb } from "../../../service/api.service";

const ChatMenu = ({ setDisplayMenu }) => {

    const { activeConversation } = useSelector(selectChat)
    const currentUser = useSelector(selectCurrentUser)
    const { isGroup, admin, users, _id: groupId } = activeConversation

    console.log(currentUser)
    const onDeleteGroupHandler = async () => {
        console.log('delete groupe')
        deleteGroupOnDb(currentUser.accessToken, groupId, currentUser._id)
    }

    const onRemoveUserHandler = () => {
        console.log('remove user')
    }

    const onAddUserHandler = () => {
        console.log('add user')
    }

    const onLeaveGroupHandler = () => {
        console.log('leave groupe')
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