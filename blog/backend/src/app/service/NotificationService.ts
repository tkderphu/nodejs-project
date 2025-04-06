import { ObjectId } from "mongodb"
import { FirebaseMessageTokenRepository, NotifyMessageRepository } from "../../db/mongo"
import { NotificationNewPostTempalte } from "../framework/template/Notification"
import { NotifyMessage } from "../model/notification"
import FirebaseService from "./FirebaseService"
import FollowService from "./FollowService"

class NotificationService {
    async getListNotifyMessage(userId: string) {
        const notifyMessages = NotifyMessageRepository.find({
            "userMessages.userId": userId
        }).sort({ createdAt: -1 }).toArray()
        return notifyMessages
    }
    async sendNotify(
        postId: string, postName: string,
        authorId: string, authorName: string, createdAt: any) {
        
        const followings = await FollowService.getListFollower(authorId, "USER")
        if(followings.length == 0) return;
        const notifyMessage: NotifyMessage = {
            createdAt: createdAt,
            //@ts-ignore
            userMessages: followings.map(following => {
                return { read: false, userId: following }
            }),
            content: NotificationNewPostTempalte(
                { authorName, createdAt, postId, postName }
            )
        }
        
        NotifyMessageRepository.insertOne(notifyMessage)
        followings.forEach(async (fUserId) => {
            //@ts-ignore
            const fmToken = await FirebaseService.getFMToken(fUserId)
            if(fmToken !== undefined) {
                const token = fmToken.token
                //@ts-ignore
                FirebaseService.sendMessage("Vừa có bài viết mới có thể bạn quan tâm", notifyMessage?.content, token)
            }
        })

    }
    async readNotifyMessage(notifyMessageId: string, userId: string) {
        NotifyMessageRepository.updateOne({
            _id: new ObjectId(notifyMessageId),
            "userMessages.userId": userId
        }, { "userMessages.read": true })
    }
    async countUnreadNotifyMessage(userId: string) {
        const result = NotifyMessageRepository.countDocuments({
            "userMessages.userId": userId,
            "userMessages.read": false
        })

        if (result) return result;
        return 0;
    }
    readAllNotifyMessage(userId: string) {
        return NotifyMessageRepository.updateMany({
            "userMessages.userId": userId
        }, { "userMessages.read": true })
    }
}
export default new NotificationService