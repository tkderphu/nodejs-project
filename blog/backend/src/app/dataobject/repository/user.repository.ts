import { ObjectId } from "mongodb"
import db from "../../../db/mongo"
import { User, UserProfile } from "../model/user"


class UserRepository {
    private userCollections = db.collection('users')

    save(user: User) {
        return this.userCollections.insertOne(user)
    }

    findById(userId: string) {
        return this.userCollections.findOne({
            _id: new ObjectId(userId)
        })
    }

    updatePasswordById(userId: string, password: string) {
        return this.updateById(userId, {password})
    }

    updateProfileById(userId: string, profile: UserProfile) {
        return this.updateById(userId, profile)
    }

    findByEmail(email: string) {
        return this.userCollections.findOne({
            email: email
        })
    }

    private updateById(userId: string, data: object) {
        return this.userCollections.updateOne({
            _id: new ObjectId(userId)
        }, {
            $set: {
                ...data
            }
        })
    }


}
export default new UserRepository()