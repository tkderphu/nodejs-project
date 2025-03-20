import { AuthLogin, AuthLoginResp, AuthRegister } from "../model/auth";
import { compare, genSalt, hash } from 'bcrypt'
import UsernameOrPasswordNotMatchException from "../exception/UsernameOrPasswordNotMatchException";
import { random6Digit } from "../framework/utils/RandomUtils";
import MailService from "./MailService";
import { ForgetPasswordTemplate } from "../framework/template/ForgetPassword";
import JwtService from "./JwtService";
import TokenIsExpiredException from "../exception/TokenIsExpiredException";
import UsernameExistsException from "../exception/UsernameExistsException";
import UserService from "./UserService";
import TokenService from "./TokenService";
import { hashPassword } from "../framework/common/auth";
class AuthenService {


    async register(authRegister: AuthRegister) {
        const userDoc = await UserService.findByEmail(authRegister.email);

        if(userDoc) {
            throw new UsernameExistsException(`email: ${authRegister.email} exists`)
        }

        const password = await hashPassword(authRegister.password)


        const result = await UserService.create({
            ...authRegister,
            password: password
        })

        return result
    }
    async login(authLogin: AuthLogin) {
        const user: any = await UserService.findByEmail(authLogin.email)
        
        if(!user) {
            throw new UsernameOrPasswordNotMatchException("Your username invalid, please check it again.")
        }
        const isWhetherPasswordMatch = await compare(authLogin.password, user.password)
        if(!isWhetherPasswordMatch) {
            throw new UsernameOrPasswordNotMatchException("Your password invalid, please check it again.")
        }
        
        await TokenService.removeAllTokenByUser(user._id.toString())
       
        const refreshToken = JwtService.generateRefreshToken(user._id.toString())
        const accessToken = JwtService.generateAccessToken(refreshToken, user._id.toString(), user.roles, user.fullName)

        TokenService.saveRefreshToken({
            token: refreshToken,
            user: {
               _id: user._id,
               fullName: user.fullName,
               image_url: user.image_url
            }
        })

        TokenService.saveAccessToken({
            refreshToken: refreshToken,
            token: accessToken,
            user: {
               _id: user._id,
               fullName: user.fullName,
               image_url: user.image_url
            }
        })

        const authResp: AuthLoginResp = {
            user: {
               _id: user._id,
               fullName: user.fullName,
               image_url: user.image_url
            },
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiredAt: JwtService.getPayload(accessToken).expiredTime,

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
            token: newAccessToken,
            user: paylaod.user
        })

        const authResp: AuthLoginResp = {
            user: paylaod.user,
            accessToken: newAccessToken,
            refreshToken: refToken,
            expiredAt: JwtService.getPayload(newAccessToken).expiredTime,
    
        }

        return authResp
    }
    


}
export default new AuthenService()