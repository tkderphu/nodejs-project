import notifyMessageService from "../../../../service/notify.message.service"
import { COUNT_UNREAD_NOTIFY_MESSAGE_BEGIN, COUNT_UNREAD_NOTIFY_MESSAGE_FAILED, COUNT_UNREAD_NOTIFY_MESSAGE_SUCCESS, FETCH_NOTIFY_MESSAGE_BEGIN, FETCH_NOTIFY_MESSAGE_FAILED, FETCH_NOTIFY_MESSAGE_SUCCESS, READ_ALL_NOTIFY_MESSAGE_BEGIN, READ_ALL_NOTIFY_MESSAGE_FAILED, READ_ALL_NOTIFY_MESSAGE_SUCCESS, READ_NOTIFY_MESSAGE_BEGIN, READ_NOTIFY_MESSAGE_FAILED, READ_NOTIFY_MESSAGE_SUCCESS } from "./notify.message.action.type"

export const fetchNotifyMessageAction = () => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_NOTIFY_MESSAGE_BEGIN
        })
        notifyMessageService.getAllNotifyMessage()
        .then(resp => {
            dispatch({
                type: FETCH_NOTIFY_MESSAGE_SUCCESS,
                payload: resp.data
            })
        }).catch(err => {
            dispatch({
                type: FETCH_NOTIFY_MESSAGE_FAILED,
                payload: {
                    code: err.status,
                    message: err.message
                }
            })
        })
    }
}
export const readNotifyMessageAction = (messageId: string) => {
    return (dispatch: any) => {
        dispatch({
            type: READ_NOTIFY_MESSAGE_BEGIN
        })
        notifyMessageService.readMessage(messageId)
        .then(resp => {
            dispatch({
                type: READ_NOTIFY_MESSAGE_SUCCESS,
                payload: resp.data
            })
        }).catch(err => {
            dispatch({
                type: READ_NOTIFY_MESSAGE_FAILED,
                payload: {
                    code: err.status,
                    message: err.message
                }
            })
        })
    }
}
export const readAllNotifyMessageAction = () => {
    return (dispatch: any) => {
        dispatch({
            type: READ_ALL_NOTIFY_MESSAGE_BEGIN
        })
        notifyMessageService.readAllMessage()
        .then(resp => {
            dispatch({
                type: READ_ALL_NOTIFY_MESSAGE_SUCCESS,
                payload: resp.data
            })
        }).catch(err => {
            dispatch({
                type: READ_ALL_NOTIFY_MESSAGE_FAILED,
                payload: {
                    code: err.status,
                    message: err.message
                }
            })
        })
    }
}
export const countUnreadNotifyMessageAction = () => {
    return (dispatch: any) => {
        console.log("fetch countUnread")
        dispatch({
            type: COUNT_UNREAD_NOTIFY_MESSAGE_BEGIN
        })
        notifyMessageService.getUnreadMessage()
        .then(resp => {
            console.log("resp unread: ", resp.data)
            dispatch({
                type: COUNT_UNREAD_NOTIFY_MESSAGE_SUCCESS,
                payload: resp.data
            })
        }).catch(err => {
            dispatch({
                type: COUNT_UNREAD_NOTIFY_MESSAGE_FAILED,
                payload: {
                    code: err.status,
                    message: err.message
                }
            })
        })
    }
}