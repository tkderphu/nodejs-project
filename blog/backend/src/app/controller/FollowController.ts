import { Request, Response } from "express";
import { getUserLoggined } from "../framework/common/auth";
import { FollowBase } from "../model/follow";
import { UserSimple } from "../model/user";
import FollowService from "../service/FollowService";
import UserService from "../service/UserService";

class FollowController {
    async follow(req: Request, res: Response, next: any) {
        try {
            const user = await UserService.getProfile(getUserLoggined(req).userId)
            const body: FollowBase = req.body
            
            if(body.type == 'TAG') {
                body.followObject = {}
            } else {
                body.followObject = user
            }

            await FollowService.follow(body)

            res.status(200).send("ok")

        } catch(err) {
            next(err)
        }
    }

    async unfollow(req: Request, res: Response, next: any) {
        const {followObjectId, type} = req.params
        //@ts-ignore
        FollowService.unfollow(getUserLoggined(req).userId, followObjectId, type)
        .then(resp => {
            res.status(200).send("ok")
        }).catch(err => {
            next(err)
        })
    }

    getFollowings(req: Request, res: Response, next: any) {
        const {userId, type} = req.params
        //@ts-ignore
        FollowService.getListFollowed(userId, type).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            next(err)
        })
    }

    getFollowers(req: Request, res: Response, next: any) {
        const {followObjectId, type} = req.params

        //@ts-ignore
        FollowService.getListFollower(followObjectId, type).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            next(err)
        })
    }

    checkFollowedObject(req: Request, res: Response, next: any) {
        const {followObjectId, type} = req.params
        //@ts-ignore
        FollowService.checkWhetherFollowed(getUserLoggined(req).userId, followObjectId, type).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            next(err)
        })

    }

}
export default new FollowController()