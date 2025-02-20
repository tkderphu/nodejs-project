import db from "../../db/mongo"
import { Like } from "../model/like"


class LikeService {
    private likeCollections = db.collection("like")

    createLike(like: Like) {
        return this.likeCollections.insertOne({
            ...like
        })
    }

    deletelikePost(postId: string, userId: string) {
        return this.deleteLike({postId: postId, userLikeId: userId})
    }
    deleteLikeComment(commentId: string, userId: string) {
        return this.deleteLike({commentId: commentId, userLikeId: userId})
    }
    deleteAllLikePost(postId: string, userId: string) {

    }

    deleteAllLikeComment(commentId: string, userId: string) {
        
    }

    private deleteLike(obj: any) {
        return this.likeCollections.deleteOne({
            ...obj
        })
    }

    async isUserLikePost(postId: string, userId: string) {
        const result = await this.likeCollections.find({
            postId: postId,
            userLikeId: userId
        })

        if(result) {
            return true
        }

        return false

    }

    async isUserLikeComment(commentId: string, userId: string) {
        const result = await this.likeCollections.find({
            commentId: commentId,
            userLikeId: userId
        })

        if(result) {
            return true
        }

        return false
    }

}

export default new LikeService()