import { loginUserOnServer, registerUserOnServer } from "../../service/api.service";
import { createAction } from "../../utils/helper";
import { USER_ACTION_TYPE } from "./user.type";

const fetchUserStart = () => {
    return createAction(USER_ACTION_TYPE.FETCH_USER_START)
}

const fetchUserSuccess = (user) => {
    return createAction(USER_ACTION_TYPE.FETCH_USER_SUCCESS, user)
}

const fetchUserFailed = (error) => {
    return createAction(USER_ACTION_TYPE.FETCH_USER_FAILED, error)
}

export const fetchUserAsync = (userData) => async (dispatch) => {

    dispatch(fetchUserStart())

    try {
        const res = await registerUserOnServer(userData)
        if (res.status !== 200) {
            throw new Error(res?.message)
        }
        return dispatch(fetchUserSuccess(res.user))
    } catch (error) {
        dispatch(fetchUserFailed(error))
    }
}

const loginUserStart = () => {
    return createAction(USER_ACTION_TYPE.LOGIN_USER_START)
}

const loginUserSuccess = (user) => {
    return createAction(USER_ACTION_TYPE.LOGIN_USER_SUCCESS, user)
}

const loginUserFailed = (error) => {
    return createAction(USER_ACTION_TYPE.LOGIN_USER_FAILED, error)
}

export const loginUserAsync = (userData) => async (dispatch) => {
    dispatch(loginUserStart())
    try {
        const res = await loginUserOnServer(userData)
        if (res.status !== 200) {
            throw new Error(res?.message)
        }
        return dispatch(loginUserSuccess(res.user))
    } catch (error) {
        dispatch(loginUserFailed(error))
    }
}

