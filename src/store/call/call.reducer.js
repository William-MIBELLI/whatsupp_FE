import { CALL_ACTION } from "./call.type"


const initialCallData = {
    isRinging: false,
    isActive: false,
    caller: undefined,
    receiver: undefined,
    myStream: undefined,
    partnerStream: undefined,
    mySignal: undefined,
    partnerSignal: undefined
}

export const callReducer = (state = initialCallData, action) => {
    const { type, payload } = action
    switch (type) {
        case CALL_ACTION.ACCEPT_CALL:
            return {
                ...state,
                isRinging: false,
                isActive: true,
                myStream: payload.stream
            }
        case CALL_ACTION.DECLINE_CALL:
            return {
                ...state,
                isRinging: false,
                isActive: false,
                caller: undefined,
                receiver: undefined,
                myStream: undefined,
                partnerStream: undefined,
                mySignal: undefined,
                partnerSignal: undefined
            }
        case CALL_ACTION.CALL_RECEIVED:
            return {
                ...state,
                isRinging: true,
                caller: payload.caller,
                partnerSignal: payload.signal,
            }
        case CALL_ACTION.SEND_CALL:
            return {
                ...state,
                isActive: true,
                caller: payload.caller,
                receiver: payload.receiver,
                mySignal: payload.signal,
                myStream: payload.stream
            }
        case CALL_ACTION.GET_STREAM:
            return {
                ...state,
                myStream: payload.stream
            }
        case CALL_ACTION.SET_PARTNER_STREAM:
            return {
                ...state,
                partnerStream: payload.stream
            }
        default:
            return state
    }
}