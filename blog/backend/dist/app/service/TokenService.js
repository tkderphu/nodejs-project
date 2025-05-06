var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AccessTokenRepository, RefreshTokenRepository } from "../../db/mongo";
class TokenService {
    saveRefreshToken(refreshToken) {
        return RefreshTokenRepository.insertOne(refreshToken);
    }
    findRefreshToken(token) {
        return RefreshTokenRepository.findOne({
            token
        });
    }
    removeRefreshToken(token) {
        return RefreshTokenRepository.deleteOne({
            token
        });
    }
    removeAllTokenByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield RefreshTokenRepository.deleteMany({
                "userId": userId
            });
            yield AccessTokenRepository.deleteMany({
                "userId": userId
            });
        });
    }
    saveAccessToken(accessToken) {
        return AccessTokenRepository.insertOne(accessToken);
    }
    findAccessToken(token) {
        return AccessTokenRepository.findOne({
            token: token
        });
    }
    removeAccessToken(token) {
        return AccessTokenRepository.deleteOne({
            token: token
        });
    }
    removeAllAccessTokenByRefreshToken(refreshToken) {
        return AccessTokenRepository.deleteMany({
            refreshToken: refreshToken
        });
    }
}
export default new TokenService();
