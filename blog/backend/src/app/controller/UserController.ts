import { Request, response, Response } from "express";
import { CommentRepository, LikeRepository, PostRepository, UserRepository } from "../../db/mongo";
import { getUserLoggined } from "../framework/common/auth";
import { User } from "../model/user";
import FollowService from "../service/FollowService";
import UserService from "../service/UserService";


class UserController {

    updateProfile(req: Request,res: Response, next: any){
        const {fullName, bio} = req.body

        UserService.updateProfileById(getUserLoggined(req).userId, {fullName, bio}).then(response => {
            res.status(200).send("update successfully")
        }).catch(err => {
            next(err)
        })
    }



    updatePassword(req: Request, res: Response, next: any) {
       const {oldPassword, newPassword} = req.body

       UserService.updatePassword(getUserLoggined(req).userId, oldPassword, newPassword).then(response => {
            res.status(200).send("update password successfully")
       }).catch(err => {
            next(err)
       })
    }

    updateSocialNetworkPlatform(req: Request, res: Response, next: any) {
        const socialNetworkPlatformReq = req.body
        UserService.updateSocialNetworkPlatform(getUserLoggined(req).userId, socialNetworkPlatformReq).then(resp => {
            res.status(200).send("ok")
        }).catch(err => {
            next(err)
        })
    }

    getUserProfile(req: Request, res: Response, next: any) {
        const {userId} = req.params
        UserService.getProfile(userId).then(response => {
            res.status(200).send(response)
        }).catch(err => {
            next(err)
        })
        
    }


    async getAuthorStats(req: Request, res: Response, next: any) {
        const users : any= (await UserRepository.find({}).toArray())
        console.log("user: ", users)
        const authors: {
            avatar?: string,
            fullName?: string
            countPost: number,
            countLike: number,
            countComment: number,
            countFollower: number,
            total: number
        }[] = []
        
        for(let user of users) {
            const countPost = await PostRepository.countDocuments({
                userId: user._id?.toString()
            })
            const countLike = await LikeRepository.countDocuments({
                userId: user._id?.toString()
            })
            const countComment = await CommentRepository.countDocuments({
                userId: user._id?.toString()
            })
            //@ts-ignore
            const countFollower = (await FollowService.getListFollower(user._id?.toString(), "USER")).length

            authors.push({
                avatar: user.image_url,
                fullName: user.fullName,
                countPost: countPost,
                countComment: countComment,
                countFollower: countFollower,
                countLike: countLike,
                total: countPost + countLike + countComment + countFollower
            })
        }

        const resp = authors.sort((user1, user2) => {
            return user2.total - user1.total
        }).slice(0, 5)

        res.status(200).send(resp)


    }


    updateProfileInfo(req: Request, res: Response, next: any) {
        const body = req.body
        UserService.updateProfileInfo(getUserLoggined(req).userId, body).then(resp => {
            res.status(200).send("update info ok")
        }).catch(err => {
            next(err)
        })
    }

}

export default new UserController()