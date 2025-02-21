"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("../../db/mongo");
class TokenService {
    saveRefreshToken(refreshToken) {
        return mongo_1.RefreshTokenRepository.insertOne(refreshToken);
    }
    findRefreshToken(token) {
        return mongo_1.RefreshTokenRepository.findOne({
            token
        });
    }
    removeRefreshToken(token) {
        return mongo_1.RefreshTokenRepository.deleteOne({
            token
        });
    }
    saveAccessToken(accessToken) {
        return mongo_1.AccessTokenRepository.insertOne(accessToken);
    }
    findAccessToken(token) {
        return mongo_1.AccessTokenRepository.findOne({
            token: token
        });
    }
    removeAccessToken(token) {
        return mongo_1.AccessTokenRepository.deleteOne({
            token: token
        });
    }
    removeAllAccessTokenByRefreshToken(refreshToken) {
        return mongo_1.AccessTokenRepository.deleteMany({
            refreshToken: refreshToken
        });
    }
}
exports.default = new TokenService();
