import { Form } from "react-hook-form";
import { toFormData } from "../utils/api.utils";

const url = process.env.REACT_APP_API_ENDPOINT;

export const registerUserOnServer = async (userData) => {
    const url = process.env.REACT_APP_API_ENDPOINT;
    const fd = toFormData(userData);

    try {
        const res = await fetch(`${url}/auth/register`, {
            method: "POST",
            body: fd,
        });
        if (res.status !== 200) {
            const data = await res.json();
            throw new Error(data.error);
        }
        const data = await res.json();
        return { status: 200, user: data };
    } catch (error) {
        return error;
    }
};

export const loginUserOnServer = async (userData) => {
    const url = process.env.REACT_APP_API_ENDPOINT;
    const fd = toFormData(userData);

    try {
        const res = await fetch(`${url}/auth/login`, {
            method: "POST",
            body: fd,
        });
        if (res.status !== 200) {
            const data = await res.json();
            throw new Error(data.error);
        }
        const data = await res.json();
        return { status: 200, user: data };
    } catch (error) {
        return error;
    }
};

export const getConversationsFromServer = async (token) => {
    const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;

    try {
        const res = await fetch(`${CONVERSATION_ENDPOINT}/getConversation`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.status !== 200) {
            const data = await res.json();
            throw new Error(data.error);
        }
        const data = await res.json();
        return { status: 200, conversations: data };
    } catch (error) {
        return error;
    }
};

export const searchUserOnDb = async (token, keyword) => {
    try {
        const res = await fetch(`${url}/search/${keyword}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.status !== 200) {
            throw new Error("Search failed 😢");
        }

        const data = await res.json();
        return data.users;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const fetchMessagesFromDb = async (token, conversationId) => {
    try {
        const res = await fetch(`${url}/message/${conversationId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.status !== 200) {
            throw new Error("failed to get conversation's messages");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return error;
    }
};

export const fetchActiveConversationFromDb = async (token, receiver_id, convoId) => {
    const fd = new FormData();
    fd.append("receiver_id", receiver_id);
    if (convoId) {
        fd.append('convoId', convoId)
    }

    try {
        const res = await fetch(`${url}/conversation`, {
            method: "POST",
            body: fd,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.status !== 200) {
            throw new Error("failed to fetch active conversation");
        }
        const data = await res.json();
        console.log("data : ", data);
        return data;
    } catch (error) {
        return error;
    }
};

export const sendMessageOnServer = async (token, values, files) => {
    const fd = toFormData(values, files);

    console.log('resultat du formatage')
    for (const pair of fd.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
    }
    
    try {
        const res = await fetch(`${url}/message`, {
            method: "POST",
            body: fd,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (res.status !== 201) {
            throw new Error("failed to create message on server");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const createGroupOnDb = async (token, groupName, selectedUsers) => {
    //const fd = toFormData({ groupName, selectedUsers })
    const fd = new FormData()
    fd.append('groupName', groupName)
    selectedUsers.forEach(userId => {
        fd.append('selectedUsers', userId)
    })
    
    try {
        const res = await fetch(`${url}/group/createGroup`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: fd,
            method: 'POST'
        })
        console.log('res avant json : ', res)
        if (res.status !== 200) {
            throw new Error('Failed to create group')
        }
        const r = await res.json()
        return r
    } catch (error) {
        console.log('error dans creategroup : ', error)
    }
}

export const deleteGroupOnDb = async (token, groupId, adminId) => {

    const fd = new FormData() 
    fd.append('groupId', groupId)
    fd.append('adminId', adminId)

    try {
        const res = await fetch(`${url}/group/delete`, {
            method: 'POST',
            body: fd,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const r = await res.json()
        console.log('r dans service : ', r)
    } catch (error) {
        console.log(error)
    }
}

export const leaveGroupOnDb = async (token, groupId) => {
    const fd = new FormData()
    fd.append('groupId', groupId)
    
    try {
        console.log('on requete le server')
        const res = await fetch(`${url}/group/leave`, {
            method: 'PUT',
            body: fd,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status !== 201) {
            throw new Error('Cant leave group')
        }
        return true
    } catch (error) {
        console.log(error)
    }
}