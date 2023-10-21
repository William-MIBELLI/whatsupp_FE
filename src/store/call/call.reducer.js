import { CALL_ACTION } from "./call.type"


const initialCallData = {
    isRinging: false,
    isActive: false,
    caller: undefined,
    receiver: undefined,
    stream: undefined
}

export const callReducer = (state = initialCallData, action) => {
    const { type, payload } = action
    switch (type) {
        case CALL_ACTION.ACCEPT_CALL:
            return {
                ...state,
                isRinging: false,
                isActive: true
            }
        case CALL_ACTION.DECLINE_CALL:
            return {
                ...state,
                isRinging: false,
                isActive: false,
                caller: undefined
            }
        case CALL_ACTION.CALL_RECEIVED:
            return {
                ...state,
                isRinging: true,
                caller: payload.caller,
                receiver: payload.receiver
            }
        case CALL_ACTION.SEND_CALL:
            return {
                ...state,
                isActive: true,
                caller: payload.caller,
                receiver: payload.receiver
            }
        default:
            return state
    }
}