import { LikeRepository } from "../../db/mongo"
import { Like } from "../model/like"


class LikeService {
  
    createLike(like: Like) {
        return LikeRepository.insertOne({
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
        return LikeRepository.deleteOne({
            ...obj
        })
    }

    async isUserLikePost(postId: string, userId: string) {
        const result = await LikeRepository.find({
            postId: postId,
            userLikeId: userId
        })

        if(result) {
            return true
        }

        return false

    }

    async isUserLikeComment(commentId: string, userId: string) {
        const result = await LikeRepository.find({
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