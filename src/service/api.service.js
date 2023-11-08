import { toFormData } from "../utils/api.utils";

const url = process.env.REACT_APP_API_ENDPOINT;
const { REACT_APP_CLOUD_SECRET, REACT_APP_CLOUD_NAME } = process.env

export const registerUserOnServer = async (userData, picture) => {
    const url = process.env.REACT_APP_API_ENDPOINT;
    const fd = toFormData(userData);
    const pictureUrl = await uploadOnCloudinary(picture)
    if (pictureUrl) {
        fd.append('pictureUrl', pictureUrl)
    }
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

const uploadOnCloudinary = async (file) => {

    if (!file) { //Si pas de photo , on return false pour éviter une requete
        return false
    }
    
    const fd = new FormData()
    fd.append('upload_preset', REACT_APP_CLOUD_SECRET)
    fd.append('file', file)
    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/auto/upload`, {
            method: 'POST',
            body: fd
        })
        if (res.status === 200) {
            const { secure_url } = await res.json()
            return secure_url
        }
        return false
    } catch (error) {
        return false
    }
}

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
        const res = await fetch(`${url}/user/${keyword}`, {
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
        return data;
    } catch (error) {
        return error;
    }
};

export const sendMessageOnServer = async (token, values, files) => {

    const fd = toFormData(values);
    
    try {
        const filesUrl = await uploadFilesOnCloud(files)
        fd.append('files',JSON.stringify(filesUrl))
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
        return error;
    }
};

const uploadFilesOnCloud = async (files) => {
    const filesUrl = []
    try {
        for (let i = 0; i < files.length; i++){
            const fd = new FormData()
            fd.append('upload_preset', REACT_APP_CLOUD_SECRET)
            fd.append('file', files[i].file)
            const f = await fetch(`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/auto/upload`, {
                method: 'POST',
                body: fd
            })
            if (f.status === 200) {
                const data = await f.json()
                filesUrl.push(data)
            }
        }
        return filesUrl
    } catch (error) {
        return false
    }
}

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
        if (res.status !== 200) {
            throw new Error('Failed to create group')
        }
        const r = await res.json()
        return r
    } catch (error) {
        return false
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
    } catch (error) {
        return false
    }
}

export const leaveGroupOnDb = async (token, groupId) => {
    const fd = new FormData()
    fd.append('groupId', groupId)
    
    try {
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
        return false
    }
}

export const removeUserFromGroupOnDb = async (token, userId, groupId) => {
    const fd = new FormData()
    fd.append('userIdToDelete', userId)
    fd.append('groupId', groupId)
    try {
        const res = await fetch(`${url}/group/remove-user`, {
            method: 'DELETE',
            body: fd,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status === 201) {
            return true
        }
    } catch (error) {
        return false
    }
}

export const updateStatusOnDb = async (token, status) => {
    const fd = new FormData()
    fd.append('status', status)

    try {
        const r = await fetch(`${url}/user/update-status`, {
            method: 'PUT',
            body: fd,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (r.status !== 201) {
            throw new Error('something goes wrong')
        }
        const resp = await r.json()
        return resp
    } catch (error) {
        return false
    }
}

export const forgetPasswordOnDb = async (email) => {

    const fd = new FormData()
    fd.append('email', email)

    try {
        const res = await fetch(`${url}/auth/forget-password`, {
            method: 'PUT',
            body: fd
        })
        if (res.status !== 200) {
            throw new Error('request failed')
        }
        return true
    } catch (error) {
        return false
    }
}