import { loginUserOnServer, registerUserOnServer, updateStatusOnDb } from "../../service/api.service";
import { createAction } from "../../utils/helper";
import { USER_ACTION_TYPE } from "./user.type";

const fetchUserStart = () => {
    return createAction(USER_ACTION_TYPE.FETCH_USER_START)
}

const fetchUserSuccess = (data) => {
    // const mappedPicUrl = parsePictureUrl(data.user.pictureUrl)
    // const newUser = { ...data.user, pictureUrl: mappedPicUrl }
    return createAction(USER_ACTION_TYPE.FETCH_USER_SUCCESS, {...data.user})
}

const fetchUserFailed = (error) => {
    return createAction(USER_ACTION_TYPE.FETCH_USER_FAILED, error)
}

export const fetchUserAsync = (userData, picture) => async (dispatch) => {

    dispatch(fetchUserStart())

    try {
        const res = await registerUserOnServer(userData, picture)
        if (res.status !== 200) {
            throw new Error(res?.message)
        }
        dispatch(fetchUserSuccess(res.user))
        return res.user
    } catch (error) {
        dispatch(fetchUserFailed(error))
        return false
    }
}

const loginUserStart = () => {
    return createAction(USER_ACTION_TYPE.LOGIN_USER_START)
}

const loginUserSuccess = (data) => {
    // const mappedPicUrl = parsePictureUrl(data.user.pictureUrl)
    // const newUser = { ...data.user, pictureUrl: mappedPicUrl }
    return createAction(USER_ACTION_TYPE.LOGIN_USER_SUCCESS,  {...data.user} )
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
        dispatch(loginUserSuccess(res.user))
        return res.user
    } catch (error) {
        dispatch(loginUserFailed(error))
        return false
    }
}

export const logoutOutUser = () => {
    return createAction(USER_ACTION_TYPE.LOGOUT_USER)
}

const updateStatusStart = () => {
    return createAction(USER_ACTION_TYPE.UPDATE_STATUS_START)
}

const updateStatusSuccess = (status, user) => {
    const newUser = {...user, status: status}
    return createAction(USER_ACTION_TYPE.UPDATE_STATUT_SUCCESS, newUser)
}

const updateStatusFailed = (error) => {
    return createAction(USER_ACTION_TYPE.UPDATE_STATUS_FAILED, error)
}

export const updateStatusAsync = (token, status, user) => async (dispatch) => {
    dispatch(updateStatusStart())
    try {
        const data = await updateStatusOnDb(token, status)
        if (!data) {
            throw new Error('Cant update status')
        }
        dispatch(updateStatusSuccess(data.status, user))
        return true
    } catch (error) {
        dispatch(updateStatusFailed(error))
        return false
    }
}

export const updateCurrentUser = (user, token) => {
    const newUser = { ...user, accessToken: token }
    return createAction(USER_ACTION_TYPE.UPDATE_CURRENT_USER, newUser)
}