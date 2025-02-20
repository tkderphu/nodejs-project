import { NextFunction, Request, Response } from "express";
import AuthenService from "../service/AuthenService";

class AuthController {

     login(req: Request, res: Response, next: NextFunction) {
        AuthenService.login(req.body).then(result => {
            res.status(200).send(result)
        }).catch(err => next(err))
    }

     register(req: Request, res: Response, next: NextFunction) {
        AuthenService.register(req.body).then(result => {
            res.status(200).send(result)
        }).catch(err => next(err))

    }

     refreshToken(req: Request, res: Response, next: NextFunction) {
        const { accessToken, refreshToken } = req.body
        AuthenService.refreshToken(accessToken, refreshToken).then(result => {
            res.status(200).send(result)
        }).catch(err => next(err))
    }

     forgetPassword(req: Request, res: Response, next: NextFunction) {
        const email: any = req.query.email
        AuthenService.forgetPassword(email).then(result => {
            res.status(200).send("We have sent to your email with code for reset password, please check and paste it at here.")
        }).catch(err => next(err))
    }

     logout(req: Request, res: Response, next: NextFunction) {
        const accessToken: any = req.query.accessToken
        AuthenService.logout(accessToken).then(result => {
            res.status(200).send(result)
        }).catch(err => next(err))
    }
}

export default new AuthController()