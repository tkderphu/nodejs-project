import { FETCH_SETTING_BEGIN, FETCH_SETTING_END, FETCH_SETTING_SUCCESS, UPDATE_SETTING_NOTIFY_BEGIN, UPDATE_SETTING_NOTIFY_END, UPDATE_SETTING_NOTIFY_SUCCESS } from "../../action/setting/setting.action.type";

export const updateSettingNotifyReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case UPDATE_SETTING_NOTIFY_BEGIN: {
            return {
                loading: true
            }
        }
        case UPDATE_SETTING_NOTIFY_SUCCESS: {
            return {
                loading: false,
                success: true
            }
        }
        case UPDATE_SETTING_NOTIFY_END: {
            return {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
}
export const fetchSettingReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case FETCH_SETTING_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_SETTING_SUCCESS: {
            return {
                loading: false,
                setting: action.payload
            }
        }
        case FETCH_SETTING_END: {
            return {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
}