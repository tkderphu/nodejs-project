import { AuthLogin, AuthLoginResp, AuthRegister } from "../dataobject/model/auth";
import userRepository from "../dataobject/repository/user.repository";
import { compare, genSalt, hash } from 'bcrypt'
import { User } from "../dataobject/model/user";
import UsernameOrPasswordNotMatchException from "../exception/UsernameOrPasswordNotMatchException";
import { random6Digit } from "../framework/utils/RandomUtils";
import MailService from "./MailService";
import { ForgetPasswordTemplate } from "../framework/template/ForgetPassword";
import JwtService from "./JwtService";
import refreshTokenRepository from "../dataobject/repository/refresh.token.repository";
import accessTokenRepository from "../dataobject/repository/access.token.repository";
class AuthenService {

    async register(authRegister: AuthRegister) {
        const password = await this.hashPassword(authRegister.password)
        const user : User  = {
            ...authRegister,
            password: password
        }
        const result = await userRepository.save(user)

        return result
    }
    async login(authLogin: AuthLogin) {
        const user = await userRepository.findByEmail(authLogin.email)
        
        if(!user) {
            throw new UsernameOrPasswordNotMatchException("Your username invalid, please check it again.")
        }
        const isWhetherPasswordMatch = await compare(authLogin.password, user.password)
        if(!isWhetherPasswordMatch) {
            throw new UsernameOrPasswordNotMatchException("Your password invalid, please check it again.")
        }
        const refreshToken = JwtService.generateRefreshToken(user._id.toString())
        const accessToken = JwtService.generateAccessToken(refreshToken, user._id.toString(), user.roles, user.fullName)

        refreshTokenRepository.save({
            token: refreshToken,
            userId: user._id.toString()
        })

        accessTokenRepository.save({
            refreshToken: refreshToken,
            token: accessToken
        })

        const authResp: AuthLoginResp = {
            userId: user._id.toString(),
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiredAt: JwtService.getPayload(accessToken).expiredTime,
            fullName: user.fullName
        }

        return authResp

    }   
    async logout(acToken: string) {
        const accessToken = await accessTokenRepository.findByToken(acToken)
        if(accessToken) {
            accessTokenRepository.removeAllByRefreshToken(accessToken.refreshToken)
            refreshTokenRepository.removeByToken(accessToken.refreshToken)
        }
        return "Logout successfully"
    }
    async forgetPassword(email: string) {
        const user = await userRepository.findByEmail(email)
        if(!user) {
            throw new UsernameOrPasswordNotMatchException("Your username invalid, please check it again.")
        }
        const randomCode = random6Digit().toString()
        MailService.sendMail(user.email, `Forget password email`, ForgetPasswordTemplate(randomCode, 5))
    }

    async refreshToken(accessToken: string, refToken: string) {
        await accessTokenRepository.removeAllByRefreshToken(refToken)
        const paylaod = JwtService.getPayload(accessToken)

        const newAccessToken = JwtService.generateAccessToken(refToken, paylaod.userId, paylaod.roles, paylaod.userFullName)

        accessTokenRepository.save({
            refreshToken: refToken,
            token: newAccessToken
        })

        const authResp: AuthLoginResp = {
            userId: paylaod.userId,
            accessToken: newAccessToken,
            refreshToken: refToken,
            expiredAt: JwtService.getPayload(newAccessToken).expiredTime,
            fullName: paylaod.userFullName
        }

        return authResp
    }
    

    private async hashPassword(userPassword: string) {
        const saltRound = 10
        const salt = await genSalt(saltRound)
        const hashPassword = await hash(userPassword, salt)
       
        return hashPassword
    }


}
export default new AuthenService()