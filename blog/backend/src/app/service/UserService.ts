import { ObjectId } from "mongodb"
import { UserRepository } from "../../db/mongo"
import UsernameOrPasswordNotMatchException from "../exception/UsernameOrPasswordNotMatchException"
import { compareHash, hashPassword, } from "../framework/common/auth"
import { User, UserProfile, UserSimple } from "../model/user"
import BookMarkService from "./BookMarkService"
import FollowService from "./FollowService"
import PostService from "./PostService"


class UserService {

    create(user: User) {
        return UserRepository.insertOne(user)
    }

    findById(id: string) {
        return UserRepository.findOne({
            _id: new ObjectId(id)
        })
    }

    findByEmail(email: string) {
        return UserRepository.findOne({
            email: email
        })
    }


    async updatePassword(userId: string, oldPassword: string, newPassword: string) {
        const user: any = await this.findById(userId)
        const isEqual = await compareHash(oldPassword, user.password)
        if(isEqual) {
            const newHashPassword = await hashPassword(newPassword)
            await this.updateById(userId, {password: newHashPassword})
        }
        throw new UsernameOrPasswordNotMatchException("Your old password invalid");
    }

    updateProfileById(userId: string, profile: {fullName: string, bio: string}) {
        return this.updateById(userId, profile)
    }

    async getProfile(userId: string) {
        const user = await this.findById(userId)
        if(user) {
            const profile : UserProfile = {
                ...user,
                followTags: await FollowService.countFollowings(user._id.toString(), "TAG"),
                followings: await FollowService.countFollowings(user._id.toString(), "USER"),
                followers:  await FollowService.countFollowers(user._id.toString(), "USER"),
                posts: await PostService.countPostIsCreatedByUserId(user._id.toString()),
                bookmark: 0,
                comments: 0
            }
            return profile;
        }
        throw new UsernameOrPasswordNotMatchException("not found user");
    }


    updateSocialNetworkPlatform(userId: string, req: { instagram?: string, github?: string, linkedln?: string, twitter?: string}) {
        return UserRepository.updateOne({
            _id: new ObjectId(userId)
        }, {
            $set: {
                "socialNetworkPlatform": req
            }
        })
    }


    private updateById(userId: string, data: object) {
        return UserRepository.updateOne({
            _id: new ObjectId(userId)
        }, {
            $set: {
                ...data
            }
        })
    }

    updateProfileInfo(userId: string, req: any) {
        return this.updateById(userId, req)
    }
    

}
export default new UserService