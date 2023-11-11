import { useDispatch, useSelector } from "react-redux";
import { Container, MenuItem, Mini, RemoveItem, RemoveList } from "./chatMenu.style";
import { selectChat } from "../../../store/chat/chat.selector";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { deleteGroupOnDb, leaveGroupOnDb, removeUserFromGroupOnDb } from "../../../service/api.service";
import {
    fetchConversationsAsync,
    removeActiveConversation,
    removeUser,
} from "../../../store/chat/chat.action";
import { useState } from "react";

const ChatMenu = ({ blurHandler }) => {
    const { activeConversation } = useSelector(selectChat);
    const currentUser = useSelector(selectCurrentUser);
    const { accessToken } = currentUser;
    const { isGroup, admin, _id: groupId, users } = activeConversation;
    const dispatch = useDispatch();
    const [displayRemoveList, setDisplayRemoveList] = useState(false);

    const onDeleteGroupHandler = async () => {
        deleteGroupOnDb(accessToken, groupId, currentUser._id);
    };

    const onRemoveUserHandler = async (userId) => {
        const res = await removeUserFromGroupOnDb(accessToken, userId, groupId)
        if (res) { // Le remove sur la db s'est bien passé, on remove l'user dans activeConvo dans le store
            dispatch(removeUser(userId, activeConversation))
        }
    };

    const onAddUserHandler = () => {
        console.log("add user");
    };

    const onLeaveGroupHandler = async () => {
        const res = await leaveGroupOnDb(accessToken, groupId);
        if (!res) {
            return;
        }
        dispatch(removeActiveConversation());
        dispatch(fetchConversationsAsync(accessToken));
    };

    return (
        <Container onMouseLeave={blurHandler} >
            {!isGroup ? (
                <MenuItem>Options coming soon 😎</MenuItem>
            ) : admin === currentUser._id ? (
                <div>
                    <RemoveItem onClick={onDeleteGroupHandler}>
                        Delete the group
                    </RemoveItem>
                    <MenuItem
                        onMouseEnter={() => setDisplayRemoveList(true)}
                        onMouseLeave={() => setDisplayRemoveList(false)}
                        >
                            Remove user
                        {
                                displayRemoveList && <RemoveList>
                                    {
                                        users.map(user => {
                                            return user._id !== currentUser._id &&(
                                                <RemoveItem key={user._id} onClick={() => onRemoveUserHandler(user._id)}>
                                                    <Mini src={user.pictureUrl} />
                                                    <p>{ user.name}</p>
                                                </RemoveItem>
                                            )
                                        })
                                    }
                            </RemoveList>
                        }
                    </MenuItem>
                    {/* <MenuItem onClick={onAddUserHandler}>Add user</MenuItem> */}
                </div>
            ) : (
                <MenuItem onClick={onLeaveGroupHandler}>
                    Leave the group
                </MenuItem>
            )}
        </Container>
    );
};

export default ChatMenu;
