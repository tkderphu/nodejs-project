"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const TokenInvalidException_1 = __importDefault(require("../exception/TokenInvalidException"));
const jwtSecretKey = process.env.JWT_SECRET_KEY || '';
class JwtService {
    generateAccessToken(refreshToken, userId, roles, userFullName) {
        const tokenTimeAlive = Number.parseInt(process.env.ACCESS_TOKEN_TIME_ALIVE || "0");
        const token = this.generateToken(tokenTimeAlive, {
            refreshToken, userFullName, roles, userId
        });
        return token;
    }
    generateRefreshToken(userId) {
        const tokenTimeAlve = Number.parseFloat(process.env.REFRESH_TOKEN_TIME_ALIVE || "0");
        const token = this.generateToken(tokenTimeAlve, {
            userId
        });
        return token;
    }
    tokenIsExpired(token) {
        try {
            const result = this.getPayload(token);
            if (result) {
                return result.expiredTime > new Date().getTime();
            }
        }
        catch (err) {
            return true;
        }
    }
    getUserId(token) {
        const { userId } = this.getPayload(token);
        return userId;
    }
    getPayload(token) {
        try {
            const result = (0, jsonwebtoken_1.verify)(token, jwtSecretKey);
            return result;
        }
        catch (err) {
            throw new TokenInvalidException_1.default(`Token: ${token} invalid`);
        }
    }
    generateToken(tokenTimeAlive, rest) {
        const data = Object.assign({ expiredTime: new Date().getTime() + tokenTimeAlive }, rest);
        const token = (0, jsonwebtoken_1.sign)(data, jwtSecretKey);
        return token;
    }
}
exports.default = new JwtService();
