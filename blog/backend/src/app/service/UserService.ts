import { ObjectId } from "mongodb"
import { UserRepository } from "../../db/mongo"
import UsernameOrPasswordNotMatchException from "../exception/UsernameOrPasswordNotMatchException"
import { compareHash, hashPassword, } from "../framework/common/auth"
import { User, UserSimple } from "../model/user"


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

    async getProfile(userId: string): Promise<UserSimple> {
        const user = await this.findById(userId)
        if(user) {
            return {...user};
        }
        throw new UsernameOrPasswordNotMatchException("not found user");
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


    

}
export default new UserService