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