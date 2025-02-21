"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenService_1 = __importDefault(require("../service/AuthenService"));
class AuthController {
    login(req, res, next) {
        AuthenService_1.default.login(req.body).then(result => {
            res.status(200).send(result);
        }).catch(err => next(err));
    }
    register(req, res, next) {
        AuthenService_1.default.register(req.body).then(result => {
            res.status(200).send(result);
        }).catch(err => next(err));
    }
    refreshToken(req, res, next) {
        const { accessToken, refreshToken } = req.body;
        AuthenService_1.default.refreshToken(accessToken, refreshToken).then(result => {
            res.status(200).send(result);
        }).catch(err => next(err));
    }
    forgetPassword(req, res, next) {
        const email = req.query.email;
        AuthenService_1.default.forgetPassword(email).then(result => {
            res.status(200).send("We have sent to your email with code for reset password, please check and paste it at here.");
        }).catch(err => next(err));
    }
    logout(req, res, next) {
        const accessToken = req.query.accessToken;
        AuthenService_1.default.logout(accessToken).then(result => {
            res.status(200).send(result);
        }).catch(err => next(err));
    }
}
exports.default = new AuthController();
