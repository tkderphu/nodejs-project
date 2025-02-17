import db from "../../../db/mongo"
import { RefreshToken } from "../model/token"


class RefreshTokenRepository {
    private refreshTokenCollection = db.collection("refresh_token")

    save(refreshToken: RefreshToken) {
        return this.refreshTokenCollection.insertOne(refreshToken)
    }

    findByToken(token: string) {
        return this.refreshTokenCollection.findOne({
            token
        })
    }
    removeByToken(token: string) {
        return this.refreshTokenCollection.deleteOne({
            token
        })
    }
    
}
export default new RefreshTokenRepository()