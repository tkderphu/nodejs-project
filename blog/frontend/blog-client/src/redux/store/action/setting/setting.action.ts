import settingService from "../../../../service/setting.service"
import { FETCH_SETTING_BEGIN, FETCH_SETTING_END, FETCH_SETTING_SUCCESS, UPDATE_SETTING_NOTIFY_BEGIN, UPDATE_SETTING_NOTIFY_END, UPDATE_SETTING_NOTIFY_SUCCESS } from "./setting.action.type"

export const updateSettingNotifyAction = (req: any) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_SETTING_NOTIFY_BEGIN
        })
        settingService.updateNotify(req).then(res => {
            dispatch({
                type: UPDATE_SETTING_NOTIFY_SUCCESS
            })
        }).catch(err => {
            dispatch({
                type: UPDATE_SETTING_NOTIFY_END
            })
        })
    }
}

export const fetchSettingAction = () => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_SETTING_BEGIN
        })
        settingService.getSetting().then(res => {
            console.log("setting: ", res.data)
            dispatch({
                type: FETCH_SETTING_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: FETCH_SETTING_END
            })
        })
    }
}