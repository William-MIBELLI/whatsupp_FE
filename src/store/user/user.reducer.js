import { USER_ACTION_TYPE } from "./user.type"

const initialState = {
    currentUser: {},
    isLoading: false,
    error: undefined
}

export const userReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case USER_ACTION_TYPE.FETCH_USER_START:
            return {
                ...state,
                isLoading: true
            }
        case USER_ACTION_TYPE.FETCH_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: undefined,
                currentUser: {...payload}
            }
        case USER_ACTION_TYPE.FETCH_USER_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload,
            }
        default:
            return state
    }
}