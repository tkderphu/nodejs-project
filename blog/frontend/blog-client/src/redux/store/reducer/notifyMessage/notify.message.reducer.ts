import { FETCH_ALL_COMMENT_BEGIN } from "../../action/comment/comment.action.type";
import { COUNT_UNREAD_NOTIFY_MESSAGE_BEGIN, COUNT_UNREAD_NOTIFY_MESSAGE_FAILED, COUNT_UNREAD_NOTIFY_MESSAGE_SUCCESS, FETCH_NOTIFY_MESSAGE_BEGIN, FETCH_NOTIFY_MESSAGE_FAILED, FETCH_NOTIFY_MESSAGE_SUCCESS } from "../../action/notifyMessage/notify.message.action.type";

export const countUnreadNotifyMessageReducer = (state: any = {count: 0}, action: any) => {
    switch(action.type) {
        case COUNT_UNREAD_NOTIFY_MESSAGE_BEGIN:
            return {
                count: 0
            }
        case COUNT_UNREAD_NOTIFY_MESSAGE_SUCCESS:
            return {
                count: action.payload
            }
        case COUNT_UNREAD_NOTIFY_MESSAGE_FAILED:
            console.error("err when fetch countUnreadNotifyMessage: ", action.payload)
            return {
                count: 0
            }
        default: return state
    }
}


export const fetchAllNotifyMessageReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case FETCH_NOTIFY_MESSAGE_BEGIN:
            return {
                loading: true
            }
        case FETCH_NOTIFY_MESSAGE_SUCCESS:
            return {
                messages: action.payload,
                loading: false
            }
        case FETCH_NOTIFY_MESSAGE_FAILED:
            return {
                error: action.payload,
                hasError: true,
                loading: false
            }
        default: return state
    }
}