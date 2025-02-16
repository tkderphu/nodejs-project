import { AuthLogin, AuthRegister } from "../dataobject/model/auth";
import userRepository from "../dataobject/repository/user.repository";
import { compare, genSalt, hash } from 'bcrypt'
import { User } from "../dataobject/model/user";
import UsernameOrPasswordNotMatchException from "../exception/UsernameOrPasswordNotMatchException";
import { random6Digit } from "../framework/utils/RandomUtils";
import MailService from "./MailService";
import { ForgetPasswordTemplate } from "../framework/template/ForgetPassword";
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

        //create token
    }
    logout() {

    }
    async forgetPassword(email: string) {
        const user = await userRepository.findByEmail(email)
        if(!user) {
            throw new UsernameOrPasswordNotMatchException("Your username invalid, please check it again.")
        }

        const randomCode = random6Digit().toString()
        
        MailService.sendMail(user.email, `Forget password email`, ForgetPasswordTemplate(randomCode, 5))
        //send mail

    }
    refreshToken(refreshToken: string) {
        
    }
    

    private async hashPassword(userPassword: string) {
        const saltRound = 10
        const salt = await genSalt(saltRound)
        const hashPassword = await hash(userPassword, salt)
       
        return hashPassword
    }


}
export default new AuthenService()