import { createAction } from "../../utils/helper"
import { CALL_ACTION } from "./call.type"

export const acceptCall = (stream) => {
    return createAction(CALL_ACTION.ACCEPT_CALL,{stream})
}

export const declineCall = () => {
    return createAction(CALL_ACTION.DECLINE_CALL)
}

export const callReceived = (caller, signal) => {
    return createAction(CALL_ACTION.CALL_RECEIVED, {caller, signal})
}

export const sendCall = (caller, receiver, signal, stream) => {
    return createAction(CALL_ACTION.SEND_CALL, {caller, receiver, signal, stream})
}

export const getStream = (stream) => {
    return createAction(CALL_ACTION.GET_STREAM, {stream})
}

export const setPartnerStream = stream => {
    return createAction(CALL_ACTION.SET_PARTNER_STREAM, {stream})
}

export const setAcceptedCall = () => {
    console.log('on change isaccepted')
    return createAction(CALL_ACTION.SET_ACCEPTED_CALL)
}