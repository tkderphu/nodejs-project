var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { compare } from 'bcrypt';
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
    register(authRegister) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDoc = yield UserService.findByEmail(authRegister.email);
            if (userDoc) {
                throw new UsernameExistsException(`email: ${authRegister.email} exists`);
            }
            const password = yield hashPassword(authRegister.password);
            const result = yield UserService.create(Object.assign(Object.assign({}, authRegister), { password: password, nickname: authRegister.fullName.trim().replace(" ", "") }));
            return result;
        });
    }
    login(authLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserService.findByEmail(authLogin.email);
            if (!user) {
                throw new UsernameOrPasswordNotMatchException("Your username invalid, please check it again.");
            }
            const isWhetherPasswordMatch = yield compare(authLogin.password, user.password);
            if (!isWhetherPasswordMatch) {
                throw new UsernameOrPasswordNotMatchException("Your password invalid, please check it again.");
            }
            yield TokenService.removeAllTokenByUser(user._id.toString());
            const refreshToken = JwtService.generateRefreshToken(user._id.toString());
            const accessToken = JwtService.generateAccessToken(refreshToken, user._id.toString(), user.roles, user.fullName);
            TokenService.saveRefreshToken({
                token: refreshToken,
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    image_url: user.image_url
                }
            });
            TokenService.saveAccessToken({
                refreshToken: refreshToken,
                token: accessToken,
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    image_url: user.image_url
                }
            });
            const authResp = {
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    image_url: user.image_url
                },
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiredAt: JwtService.getPayload(accessToken).expiredTime,
            };
            return authResp;
        });
    }
    logout(acToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield TokenService.findAccessToken(acToken);
            if (accessToken) {
                TokenService.removeAllAccessTokenByRefreshToken(accessToken.refreshToken);
                TokenService.removeRefreshToken(accessToken.refreshToken);
            }
            return "Logout successfully";
        });
    }
    forgetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserService.findByEmail(email);
            if (!user) {
                throw new UsernameOrPasswordNotMatchException("Your username invalid, please check it again.");
            }
            const randomCode = random6Digit().toString();
            MailService.sendMail(user.email, `Forget password email`, ForgetPasswordTemplate(randomCode, 5));
        });
    }
    refreshToken(accessToken, refToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield TokenService.removeAllAccessTokenByRefreshToken(refToken);
            if (JwtService.tokenIsExpired(refToken)) {
                yield TokenService.removeRefreshToken(refToken);
                throw new TokenIsExpiredException("Refresh token is expired");
            }
            const paylaod = JwtService.getPayload(accessToken);
            const newAccessToken = JwtService.generateAccessToken(refToken, paylaod.userId, paylaod.roles, paylaod.userFullName);
            TokenService.saveAccessToken({
                refreshToken: refToken,
                token: newAccessToken,
                user: paylaod.user
            });
            const authResp = {
                user: paylaod.user,
                accessToken: newAccessToken,
                refreshToken: refToken,
                expiredAt: JwtService.getPayload(newAccessToken).expiredTime,
            };
            return authResp;
        });
    }
}
export default new AuthenService();
