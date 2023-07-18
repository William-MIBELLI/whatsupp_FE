export const registerUserOnServer = async (userData) => {
    const url = process.env.REACT_APP_API_ENDPOINT;

    try {
        const res = await fetch(`${url}/auth/register`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "content-type": "application/json",
            },
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
