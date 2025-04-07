import api from "../interceptor/AxiosInterceptor"

class NotifyMessageService {
    getAllNotifyMessage() {
        return api.get("/notify-messages/user")
    }
    getUnreadMessage() {
        return api.get("/notify-messages/user/count/unread")
    }
    readMessage(messageId: string) {
        return api.put(`/notify-messages/user/read/${messageId}`)
    }
    readAllMessage() {
        return api.put("/notify-messages/user/read/all")
    }
}
export default new NotifyMessageService()