import api from "../interceptor/AxiosInterceptor"
export interface Setting {
    userId: string
    notification: {
        fromFollowing: boolean,
        fromCommentInteraction: boolean
        fromLikeInteraction: boolean,
        allowPushNotifyMessage: boolean,
        allowNotifySound: boolean
    }
}
export interface SettingNotify {
    fromFollowing: boolean,
    fromCommentInteraction: boolean
    fromLikeInteraction: boolean,
    allowPushNotifyMessage: boolean,
    allowNotifySound: boolean
}
class SettingService {
    updateNotify(notification: SettingNotify) {
        return api.put("/settings/notification", notification)
    }
    getSetting() {
        return api.get("/settings")
    }
}
export default new SettingService()