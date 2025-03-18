import { ObjectId } from "mongodb";
import { FollowRepository } from "../../db/mongo";
import { FollowBase } from "../model/follow";

class FollowService {


     follow(follow: FollowBase) {
        return FollowRepository.insertOne({...follow})
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

    getListFollower(followObjectId: string, type: "USER" | "TAG") {
        return FollowRepository.find({
            "followObject._id": new ObjectId(followObjectId),
            "type": type
        }).toArray()
    }


}

export default new FollowService()