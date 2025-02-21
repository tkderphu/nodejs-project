"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const UsernameOrPasswordNotMatchException_1 = __importDefault(require("../exception/UsernameOrPasswordNotMatchException"));
const RandomUtils_1 = require("../framework/utils/RandomUtils");
const MailService_1 = __importDefault(require("./MailService"));
const ForgetPassword_1 = require("../framework/template/ForgetPassword");
const JwtService_1 = __importDefault(require("./JwtService"));
const TokenIsExpiredException_1 = __importDefault(require("../exception/TokenIsExpiredException"));
const UsernameExistsException_1 = __importDefault(require("../exception/UsernameExistsException"));
const UserService_1 = __importDefault(require("./UserService"));
const TokenService_1 = __importDefault(require("./TokenService"));
class AuthenService {
    register(authRegister) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDoc = yield UserService_1.default.findByEmail(authRegister.email);
            if (userDoc) {
                throw new UsernameExistsException_1.default(`email: ${authRegister.email} exists`);
            }
            const password = yield this.hashPassword(authRegister.password);
            const user = Object.assign(Object.assign({}, authRegister), { password: password });
            const result = yield UserService_1.default.create(user);
            return result;
        });
    }
    login(authLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserService_1.default.findByEmail(authLogin.email);
            if (!user) {
                throw new UsernameOrPasswordNotMatchException_1.default("Your username invalid, please check it again.");
            }
            const isWhetherPasswordMatch = yield (0, bcrypt_1.compare)(authLogin.password, user.password);
            if (!isWhetherPasswordMatch) {
                throw new UsernameOrPasswordNotMatchException_1.default("Your password invalid, please check it again.");
            }
            const refreshToken = JwtService_1.default.generateRefreshToken(user._id.toString());
            const accessToken = JwtService_1.default.generateAccessToken(refreshToken, user._id.toString(), user.roles, user.fullName);
            TokenService_1.default.saveRefreshToken({
                token: refreshToken,
                userId: user._id.toString()
            });
            TokenService_1.default.saveAccessToken({
                refreshToken: refreshToken,
                token: accessToken
            });
            const authResp = {
                userId: user._id.toString(),
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiredAt: JwtService_1.default.getPayload(accessToken).expiredTime,
                fullName: user.fullName
            };
            return authResp;
        });
    }
    logout(acToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield TokenService_1.default.findAccessToken(acToken);
            if (accessToken) {
                TokenService_1.default.removeAllAccessTokenByRefreshToken(accessToken.refreshToken);
                TokenService_1.default.removeRefreshToken(accessToken.refreshToken);
            }
            return "Logout successfully";
        });
    }
    forgetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserService_1.default.findByEmail(email);
            if (!user) {
                throw new UsernameOrPasswordNotMatchException_1.default("Your username invalid, please check it again.");
            }
            const randomCode = (0, RandomUtils_1.random6Digit)().toString();
            MailService_1.default.sendMail(user.email, `Forget password email`, (0, ForgetPassword_1.ForgetPasswordTemplate)(randomCode, 5));
        });
    }
    refreshToken(accessToken, refToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield TokenService_1.default.removeAllAccessTokenByRefreshToken(refToken);
            if (JwtService_1.default.tokenIsExpired(refToken)) {
                yield TokenService_1.default.removeRefreshToken(refToken);
                throw new TokenIsExpiredException_1.default("Refresh token is expired");
            }
            const paylaod = JwtService_1.default.getPayload(accessToken);
            const newAccessToken = JwtService_1.default.generateAccessToken(refToken, paylaod.userId, paylaod.roles, paylaod.userFullName);
            TokenService_1.default.saveAccessToken({
                refreshToken: refToken,
                token: newAccessToken
            });
            const authResp = {
                userId: paylaod.userId,
                accessToken: newAccessToken,
                refreshToken: refToken,
                expiredAt: JwtService_1.default.getPayload(newAccessToken).expiredTime,
                fullName: paylaod.userFullName
            };
            return authResp;
        });
    }
    hashPassword(userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const saltRound = 10;
            const salt = yield (0, bcrypt_1.genSalt)(saltRound);
            const hashPassword = yield (0, bcrypt_1.hash)(userPassword, salt);
            return hashPassword;
        });
    }
}
exports.default = new AuthenService();
