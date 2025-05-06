import { sign, verify } from 'jsonwebtoken';
import TokenInvalidException from '../exception/TokenInvalidException';
import dotenv from 'dotenv';
dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY || 'what de hell';
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
            console.log(result);
            const ck = result.expiredTime < new Date().getTime();
            console.log(ck);
            return ck;
        }
        catch (err) {
            console.log("vl");
            return true;
        }
    }
    getUserId(token) {
        const { userId } = this.getPayload(token);
        return userId;
    }
    getPayload(token) {
        try {
            const result = verify(token, jwtSecretKey);
            return result;
        }
        catch (err) {
            throw new TokenInvalidException(`Token: ${token} invalid`);
        }
    }
    generateToken(tokenTimeAlive, rest) {
        const data = Object.assign({ expiredTime: (new Date().getTime() + tokenTimeAlive) }, rest);
        console.log("secret key: ", jwtSecretKey);
        const token = sign(data, jwtSecretKey);
        return token;
    }
}
export default new JwtService();
