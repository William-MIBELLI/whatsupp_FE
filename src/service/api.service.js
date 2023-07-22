import { toFormData } from "../utils/api.utils";

export const registerUserOnServer = async (userData) => {

    const url = process.env.REACT_APP_API_ENDPOINT;
    const fd = toFormData(userData)

    try {
        const res = await fetch(`${url}/auth/register`, {
            method: "POST",
            body: fd
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

    const url = process.env.REACT_APP_API_ENDPOINT
    const fd = toFormData(userData)

    try {
        const res = await fetch(`${url}/auth/login`, {
            method: 'POST',
            body: fd
        })
        if (res.status !== 200) {
            const data = await res.json();
            throw new Error(data.error);
        }
        const data = await res.json();
        return { status: 200, user: data };
    } catch (error) {
        return error
    }
}

export const getConversationsFromServer = async (token) => {
    const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`

    try {
        const res = await fetch(`${CONVERSATION_ENDPOINT}/getConversation`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status !== 200) {
            const data = await res.json()
            throw new Error(data.error)
        }
        const data = await res.json()
        return { status: 200, conversations: data}
    } catch (error) {
        return error
    }
}

export const searchUserOnDb = async (token, keyword) => {

    const url = process.env.REACT_APP_API_ENDPOINT

    try {
        const res = await fetch(`${url}/search/${keyword}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status !== 200) {
            throw new Error('Search failed')
        }

        const data = await res.json()
        return data.users

    } catch (error) {
        console.log(error)
        return error
    }
}