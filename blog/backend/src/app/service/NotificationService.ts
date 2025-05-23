import { ObjectId } from "mongodb"
import { FirebaseMessageTokenRepository, NotifyMessageRepository } from "../../db/mongo"
import { getIO } from "../../third/socket/socket"
import { NotificationNewPostTempalte } from "../framework/template/Notification"
import { NotifyComment, NotifyFollow, NotifyMessage, NotifyNewPost } from "../model/notification"
import { UserSimple } from "../model/user"
import CommentService from "./CommentService"
import FirebaseService from "./FirebaseService"
import FollowService from "./FollowService"
import PostService from "./PostService"

class NotificationService {
    async getListNotifyMessage(userId: string) {
        const notifyMessages = (await  NotifyMessageRepository.aggregate([
            {
                $unwind: "$userMessages"
            },
            {
                $match: {
                    "userMessages.userId": userId
                }
            }
        ]).sort({"createdAt": -1}).toArray())
        
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
        const id = await NotifyMessageRepository.insertOne(notifyMessage)
        notifyMessage._id = id.insertedId
        getIO().emit(`topic_notification_user_${userFollowId}`, notifyMessage);
        
    }

    async saveNotifyReplyComment(oldCommentId: string, user: { _id: string, fullName: string, avatar: string }, post: { _id: string, title: string }) {
        const commentAuthor = await CommentService.getCommentById(oldCommentId)
        const notifyReplyComment: NotifyComment = {
            commentId: oldCommentId,
            post: post,
            user: user
        }

        const notifyMessage: NotifyMessage = {
            createdAt: new Date(),
            notifyType: "REPLY_COMMENT",
            params: notifyReplyComment,
            userMessages: [{ read: false, userId: commentAuthor.userId }]
        }
        const id = await NotifyMessageRepository.insertOne(notifyMessage)
        notifyMessage._id = id.insertedId
        getIO().emit(`topic_notification_user_${commentAuthor.userId}`, notifyMessage);

    }

    async saveNotifyComment(commentId: string, user: { _id: string, fullName: string, avatar: string }, post: { _id: string, title: string }) {
        const postDoc = await PostService.findById(post._id)
        const authorId = postDoc.userId

        const notifyComment: NotifyComment = {
            post: post,
            user: user,
            commentId: commentId
        }

        const notifyMessage: NotifyMessage = {
            createdAt: new Date(),
            notifyType: "COMMENT",
            params: notifyComment,
            userMessages: [{ read: false, userId: authorId }]
        }
        const id = await NotifyMessageRepository.insertOne(notifyMessage)
        notifyMessage._id = id.insertedId

        getIO().emit(`topic_notification_user_${authorId}`, notifyMessage);


    }
    async saveNotifyPost(author: { _id: string, fullName: string, avatar: string}, post: { _id: string, title: string }) {
        const followers = await FollowService.getListFollower(author._id, "USER")
        const notifyPost: NotifyNewPost = {
            author: author,
            post: post
        }
        const users = followers.map((follower) => {
            const user = follower.user as UserSimple
            return {
                read: false,
                userId: user._id?.toString() || ""
            }
        }) || []

        const notifyMessage: NotifyMessage = {
            createdAt: new Date(),
            notifyType: "POST",
            params: notifyPost,
            userMessages: users
        }

        const id = await NotifyMessageRepository.insertOne(notifyMessage)
        notifyMessage._id = id.insertedId
        users.forEach(user => {
            getIO().emit(`topic_notification_user_${user.userId}`, notifyMessage);    
        })
        // await FirebaseService.sendMessage()
    }

    async readNotifyMessage(notifyMessageId: string, userId: string) {
        await NotifyMessageRepository.updateOne(
            {
                _id: new ObjectId(notifyMessageId), // Notification ID
            },
            {
                $set: {
                    "userMessages.$[elem].read": true
                }
            },
            {
                arrayFilters: [
                    {
                        "elem.userId": userId,
                        "elem.read": false
                    }
                ]
            }
        )
        
    }
    async countUnreadNotifyMessage(userId: string) {
        console.log("count unread message")
        const result = (await NotifyMessageRepository.aggregate([
            { $unwind: "$userMessages" },
            {
                $match: {
                    "userMessages.read": false,
                    "userMessages.userId": "67f1e2e5efa5824400a03369"
                }
            },
            {
                $count: 'unreadCount'
            }
        ]).toArray()).at(0)?.unreadCount
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