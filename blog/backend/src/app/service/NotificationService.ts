import { ObjectId } from "mongodb"
import { FirebaseMessageTokenRepository, NotifyMessageRepository } from "../../db/mongo"
import { NotificationNewPostTempalte } from "../framework/template/Notification"
import { NotifyComment, NotifyFollow, NotifyMessage, NotifyNewPost, NotifyReplyComment } from "../model/notification"
import FirebaseService from "./FirebaseService"
import FollowService from "./FollowService"
import PostService from "./PostService"

class NotificationService {
    async getListNotifyMessage(userId: string) {
        const notifyMessages = NotifyMessageRepository.find({
            "userMessages.userId": userId
        }).sort({ createdAt: -1 }).toArray()
        return notifyMessages
    }
    async saveNotifyFollow(user: {
        avatar?: string,
        fullname?: string,
        _id?: string
    }, userFollowId: string) {
        const notifyFollow: NotifyFollow = {
            user: user
        }

        const notifyMessage: NotifyMessage = {
            createdAt: new Date(),
            notifyType: "FOLLOW",
            params: notifyFollow,
            userMessages: [{ read: false, userId: userFollowId }]
        }

        await NotifyMessageRepository.insertOne(notifyMessage)
    }

    async saveNotifyReplyComment(oldComment: { _id: string, user: { _id: string } }, user: { _id: string, fullName: string, avatar: string }, post: { _id: string, title: string }) {
        const notifyReplyComment: NotifyReplyComment = {
            oldComment: oldComment,
            post: post,
            user: user
        }

        const notifyMessage: NotifyMessage = {
            createdAt: new Date(),
            notifyType: "REPLY_COMMENT",
            params: notifyReplyComment,
            userMessages: [{ read: false, userId: oldComment.user._id }]
        }

        await NotifyMessageRepository.insertOne(notifyMessage)
    }

    async saveNotifyComment(user: { _id: string, fullName: string, avatar: string }, post: { _id: string, title: string }) {
        const postDoc = await PostService.findById(post._id)
        const authorId = postDoc.userId

        const notifyComment: NotifyComment = {
            post: post,
            user: user
        }

        const notifyMessage: NotifyMessage = {
            createdAt: new Date(),
            notifyType: "COMMENT",
            params: notifyComment,
            userMessages: [{ read: false, userId: authorId }]
        }

        await NotifyMessageRepository.insertOne(notifyMessage)

    }
    async saveNotifyPost(author: { _id: string, fullName: string }, post: { _id: string, title: string }) {
        const followers = await FollowService.getListFollower(author._id, "USER")
        const notifyPost: NotifyNewPost = {
            author: author,
            post: post
        }
        const users = followers.map((follower) => {
            return {
                read: false,
                userId: follower._id.toString()
            }
        })

        const notifyMessage: NotifyMessage = {
            createdAt: new Date(),
            notifyType: "POST",
            params: notifyPost,
            userMessages: users
        }

        await NotifyMessageRepository.insertOne(notifyMessage)
        // await FirebaseService.sendMessage()
    }

    async readNotifyMessage(notifyMessageId: string, userId: string) {
        NotifyMessageRepository.updateOne({
            _id: new ObjectId(notifyMessageId),
            "userMessages.userId": userId
        }, { "userMessages.read": true })
    }
    async countUnreadNotifyMessage(userId: string) {
        console.log("count unread message")
        const result = await NotifyMessageRepository.countDocuments({
            "userMessages.userId": userId,
            "userMessages.read": false
        })
        console.log("countUnread: ", result)
        return result
    }
    readAllNotifyMessage(userId: string) {
        return NotifyMessageRepository.updateMany({
            "userMessages.userId": userId
        }, { "userMessages.read": true })
    }




}
export default new NotificationService()