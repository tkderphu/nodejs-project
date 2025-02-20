import { ObjectId } from "mongodb"
import { UserRepository } from "../../db/mongo"
import { User, UserProfile } from "../model/user"


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


    updatePasswordById(userId: string, password: string) {
        return this.updateById(userId, {password})
    }

    updateProfileById(userId: string, profile: UserProfile) {
        return this.updateById(userId, profile)
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