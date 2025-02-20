import { AuthLogin, AuthLoginResp, AuthRegister } from "../model/auth";
import { compare, genSalt, hash } from 'bcrypt'
import { User } from "../model/user";
import UsernameOrPasswordNotMatchException from "../exception/UsernameOrPasswordNotMatchException";
import { random6Digit } from "../framework/utils/RandomUtils";
import MailService from "./MailService";
import { ForgetPasswordTemplate } from "../framework/template/ForgetPassword";
import JwtService from "./JwtService";
import TokenIsExpiredException from "../exception/TokenIsExpiredException";
import UsernameExistsException from "../exception/UsernameExistsException";
import UserService from "./UserService";
import TokenService from "./TokenService";
class AuthenService {


    async register(authRegister: AuthRegister) {
        const userDoc = await UserService.findByEmail(authRegister.email);

        if(userDoc) {
            throw new UsernameExistsException(`email: ${authRegister.email} exists`)
        }

        const password = await this.hashPassword(authRegister.password)

        const user : User  = {
            ...authRegister,
            password: password
        }
        const result = await UserService.create(user)

        return result
    }
    async login(authLogin: AuthLogin) {
        const user = await UserService.findByEmail(authLogin.email)
        
        if(!user) {
            throw new UsernameOrPasswordNotMatchException("Your username invalid, please check it again.")
        }
        const isWhetherPasswordMatch = await compare(authLogin.password, user.password)
        if(!isWhetherPasswordMatch) {
            throw new UsernameOrPasswordNotMatchException("Your password invalid, please check it again.")
        }
        const refreshToken = JwtService.generateRefreshToken(user._id.toString())
        const accessToken = JwtService.generateAccessToken(refreshToken, user._id.toString(), user.roles, user.fullName)

        TokenService.saveRefreshToken({
            token: refreshToken,
            userId: user._id.toString()
        })

        TokenService.saveAccessToken({
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
        const accessToken = await TokenService.findAccessToken(acToken)
        if(accessToken) {
            TokenService.removeAllAccessTokenByRefreshToken(accessToken.refreshToken)
            TokenService.removeRefreshToken(accessToken.refreshToken)
        }
        return "Logout successfully"
    }
    async forgetPassword(email: string) {
        const user = await UserService.findByEmail(email)
        if(!user) {
            throw new UsernameOrPasswordNotMatchException("Your username invalid, please check it again.")
        }
        const randomCode = random6Digit().toString()
        MailService.sendMail(user.email, `Forget password email`, ForgetPasswordTemplate(randomCode, 5))
    }

    async refreshToken(accessToken: string, refToken: string) {
        await TokenService.removeAllAccessTokenByRefreshToken(refToken)
        
        if(JwtService.tokenIsExpired(refToken)) {
            await TokenService.removeRefreshToken(refToken)
            throw new TokenIsExpiredException("Refresh token is expired")
        }
        const paylaod = JwtService.getPayload(accessToken)
        
        const newAccessToken = JwtService.generateAccessToken(refToken, paylaod.userId, paylaod.roles, paylaod.userFullName)

        TokenService.saveAccessToken({
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
    

    public async hashPassword(userPassword: string) {
        const saltRound = 10
        const salt = await genSalt(saltRound)
        const hashPassword = await hash(userPassword, salt)
       
        return hashPassword
    }


}
export default new AuthenService()