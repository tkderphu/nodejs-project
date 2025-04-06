import { ObjectId } from "mongodb";
import { FollowRepository } from "../../db/mongo";
import { FollowBase } from "../model/follow";

class FollowService {


     follow(user: any, followObject: any, type: any) {
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

     getListFollowed(userId: string, type: "USER" | "TAG") {
        return FollowRepository.find({
            userId: userId,
            type: type
        }).toArray()
    }

    async getListFollower(followObjectId: string, type: "USER" | "TAG") {
        const result =  FollowRepository.find({
            "followObject._id": new ObjectId(followObjectId),
            "type": type
        }).toArray()
        return result;
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