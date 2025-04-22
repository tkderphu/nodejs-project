import { ObjectId } from "mongodb"
import { CommentRepository } from "../../db/mongo"
import { startFrom } from "../framework/common/page"
import { Comment, CommentReqVO } from "../model/comment"
import { Post } from "../model/post"
import { User } from "../model/user"
import LikeService from "./LikeService"
import NotificationService from "./NotificationService"
import PostService from "./PostService"
import UserService from "./UserService"

class CommentService {

    async createComment(userId: string, commentReq: CommentReqVO) {
        const post: any = await PostService.findById(commentReq.postId)
        const author: any = await UserService.findById(userId)
        const comment: Comment = {
            createdDate: new Date(),
            imageUrls: commentReq.imageUrls,
            postId: commentReq.postId,
            content: commentReq.content,
            rootCommentId: commentReq.rootCommentId,
            replyCommentId: commentReq.replyCommentId,
            userId: userId
        }

        const resultInsert = await CommentRepository.insertOne(comment)

        if (post.userId != userId && !commentReq.replyCommentId) {
            NotificationService.saveNotifyComment(
                resultInsert.insertedId.toString(),
                {
                    _id: author?._id.toString(),
                    avatar: author.image_url,
                    fullName: author.fullName
                }, {
                _id: post._id.toString(),
                title: post.title
            })
        } else if (commentReq.replyCommentId) {
            NotificationService.saveNotifyReplyComment(
                commentReq.replyCommentId,
                {
                    _id: author?._id.toString(),
                    avatar: author.image_url,
                    fullName: author.fullName
                },
                {
                    _id: post._id.toString(),
                    title: post.title
                })
        }
        return resultInsert
    }


    async getListCommentByPost(postId: string) {
        const comments = await CommentRepository.find({
            postId: postId,
            rootCommentId: null
        }).sort({ "createdDate": -1 }).toArray();
        const result = []
        for (let comment of comments) {
            result.push({
                ...comment,
                user: await UserService.findById(comment.userId),
                nestedComments: await this.getListCommentByRoot(comment._id.toString())
            })
        }
        return result;
    }

    private async getListCommentByRoot(rootCommentId: string) {
        const reuslt = await CommentRepository.find({
            rootCommentId: rootCommentId
        }).sort({ "createdDate": -1 }).toArray()
        const res = []
        for (let comment of reuslt) {
            res.push({
                ...comment,
                user: await UserService.findById(comment.userId),
                replyComment: await this.getCommentById(comment.replyCommentId)
            })
        }
        return res;
    }

    async getCommentById(commentId: string) {
        const comment: any = await CommentRepository.findOne({
            _id: new ObjectId(commentId)
        })

        return {
            ...comment,
            user: await UserService.findById(comment.userId)
        }
    }

    async removeCommentById(commentId: string, userId: string) {
        await CommentRepository.deleteOne({
            _id: new ObjectId(commentId),
            "user._id": new ObjectId(userId)
        })
        return true;
    }

    async countByPost(postId: string) {
        return CommentRepository.countDocuments({
            postId: postId
        })
    }
}
export default new CommentService()