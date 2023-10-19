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

export const fetchActiveConversationFromDb = async (token, receiver_id) => {
    const fd = new FormData();
    fd.append("receiver_id", receiver_id);

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
