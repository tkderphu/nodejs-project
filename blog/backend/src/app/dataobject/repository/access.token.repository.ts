import db from "../../../db/mongo"
import { AccessToken } from "../model/token"


class AccessTokenRepository {
    private accessTokenTokenCollection = db.collection("access_token")

    save(accessToken: AccessToken) {
        return this.accessTokenTokenCollection.insertOne(accessToken)
    }

    findByToken(token: string) {
        return this.accessTokenTokenCollection.findOne({
            token: token
        })
    }
    removeByToken(token: string) {
        return this.accessTokenTokenCollection.deleteOne({
            token: token
        })
    }
    removeAllByRefreshToken(refreshToken: string) {
        return this.accessTokenTokenCollection.deleteMany({
            refreshToken: refreshToken
        })
    }

}
export default new AccessTokenRepository()