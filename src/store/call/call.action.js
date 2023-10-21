import { createAction } from "../../utils/helper"
import { CALL_ACTION } from "./call.type"

export const acceptCall = () => {
    return createAction(CALL_ACTION.ACCEPT_CALL)
}

export const declineCall = () => {
    return createAction(CALL_ACTION.DECLINE_CALL)
}

export const callReceived = (caller, receiver) => {
    //console.log('caller dans callreceived: ', caller)
    return createAction(CALL_ACTION.CALL_RECEIVED, {caller, receiver})
}

export const sendCall = (caller, receiver) => {
    return createAction(CALL_ACTION.SEND_CALL, {caller, receiver})
}