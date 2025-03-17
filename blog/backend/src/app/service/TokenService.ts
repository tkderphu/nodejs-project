import { AccessTokenRepository, RefreshTokenRepository } from "../../db/mongo"
import { AccessToken, RefreshToken } from "../model/token"

class TokenService {
    saveRefreshToken(refreshToken: RefreshToken) {
        return RefreshTokenRepository.insertOne(refreshToken)
    }

    findRefreshToken(token: string) {
        return RefreshTokenRepository.findOne({
            token
        })
    }
    removeRefreshToken(token: string) {
        return RefreshTokenRepository.deleteOne({
            token
        })
    }

    async removeAllTokenByUser(userId: string) {
        await RefreshTokenRepository.deleteMany({
            "userId": userId
        })
        await AccessTokenRepository.deleteMany({
            "userId": userId
        })
    }

    saveAccessToken(accessToken: AccessToken) {
        return AccessTokenRepository.insertOne(accessToken)
    }

    findAccessToken(token: string) {
        return AccessTokenRepository.findOne({
            token: token
        })
    }
    removeAccessToken(token: string) {
        return AccessTokenRepository.deleteOne({
            token: token
        })
    }
    removeAllAccessTokenByRefreshToken(refreshToken: string) {
        return AccessTokenRepository.deleteMany({
            refreshToken: refreshToken
        })
    }

}

export default new TokenService()