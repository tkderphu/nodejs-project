
import { decode, sign, verify } from 'jsonwebtoken'
import TokenInvalidException from '../exception/TokenInvalidException'
import TokenIsExpiredException from '../exception/TokenIsExpiredException'
const jwtSecretKey = process.env.JWT_SECRET_KEY || ''

interface Payload {
    expiredTime: number,
    userId: string,
    roles: string[],
    userFullName: string
    refreshToken: string
}

class JwtService {
    generateAccessToken(refreshToken: string, userId: string, roles: string[], userFullName: string) {
        const tokenTimeAlive = Number.parseInt(process.env.ACCESS_TOKEN_TIME_ALIVE || "0")
        const token = this.generateToken(tokenTimeAlive, {
            refreshToken, userFullName, roles, userId
        })
        return token
    }

    generateRefreshToken(userId: string) {
        const tokenTimeAlve = Number.parseFloat(process.env.REFRESH_TOKEN_TIME_ALIVE || "0")
        const token = this.generateToken(tokenTimeAlve, {
            userId
        })
        return token
    }

    tokenIsExpired(token: string) {
        try {
            const result: any = this.getPayload(token)
            if (result) {
                return result.expiredTime > new Date().getTime()
            }
        } catch (err) {

            return true
        }
    }


    getUserId(token: string) {
        const { userId }: any = this.getPayload(token)
        return userId
    }

    getPayload(token: string): any {
        try {
            const result: any = verify(token, jwtSecretKey)
            return result
        }
        catch (err) {
            throw new TokenInvalidException(`Token: ${token} invalid`)
        }
    }

    private generateToken(tokenTimeAlive: number, rest: object) {
        const data = {
            expiredTime: new Date().getTime() + tokenTimeAlive,
            ...rest
        }
        const token = sign(data, jwtSecretKey)

        return token
    }


}
export default new JwtService()