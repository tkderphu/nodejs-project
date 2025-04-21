import { ObjectId } from "mongodb";
import { FollowRepository } from "../../db/mongo";
import { Follow, FollowBase } from "../model/follow";
import UserService from "./UserService";

class FollowService {


     follow(user: any, followObject: any, type: "USER" | "TAG") {
        const followOb: FollowBase = {
            user, followObject, type
        }
        return FollowRepository.insertOne(followOb)
    }

     unfollow(userId: string, followObjectId: string, type: "USER" | "TAG") {
        return FollowRepository.deleteOne({
            "user._id": new ObjectId(userId),
            "followObject._id": new ObjectId(followObjectId),
            "type": type
        })
    }

     async getListFollowed(userId: string, type: "USER" | "TAG") {
        const result = (await  FollowRepository.find({
            "user._id": new ObjectId(userId),
            type: type
        }).toArray())

        const resp = []
        for(let following of result) {
            resp.push({
                ...following, 
                //@ts-ignore
                "followObject": (type === "USER") ? (await UserService.getProfile(following.followObject._id?.toString())) : following.followObject
            })
        }

        return resp;

    }

    async getListFollower(followObjectId: string, type: "USER" | "TAG") {
        const result = await  FollowRepository.find({
            "followObject._id": new ObjectId(followObjectId),
            "type": type
        }).toArray()

        const resp = []
        for(let following of result) {
            resp.push({
                ...following, 
                //@ts-ignore
                "user": (await UserService.getProfile(following.user._id.toString()))
            })
        }

        return resp;


    }
    async checkWhetherFollowed(userId: string, followObjectId: string, type: "USER" | "TAG") {
        const result = await  FollowRepository.findOne({
            "user._id": new ObjectId(userId),
            "followObject._id": new ObjectId(followObjectId),
            "type": type
        })

        if(result) return true
        return false;
    }
 

    async countFollowings(userId: string, type: "USER" | "TAG") {
        const result = await FollowRepository.countDocuments({
            "user._id": new ObjectId(userId),
            type: type
        })
        if(result) return result;
        return 0;
    }

    async countFollowers(followObjId: string, type: "USER" | "TAG") {
        const result = await FollowRepository.countDocuments({
            "followObject._id": new ObjectId(followObjId),
            "type": type
        })
        if(result) return result;
        return 0;
    }
}

export default new FollowService()