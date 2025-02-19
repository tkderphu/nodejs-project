import { NextFunction, Request, Response } from "express";
import AuthenService from "../service/AuthenService";

class AuthController {

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await AuthenService.login(req.body)
            res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await AuthenService.register(req.body)
            res.status(200).send(result)
        } catch(err ) {
            next(err)
        }

    }

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { accessToken, refreshToken } = req.body
            const result = await AuthenService.refreshToken(accessToken, refreshToken)
            res.status(200).send(result)
    
        } catch(err) {
            next(err)
        }
    }

    async forgetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const email: any = req.query.email
            await AuthenService.forgetPassword(email)
            res.status(200).send("We have sent to your email with code for reset password, please check and paste it at here.")
        } catch (err) {
            next(err)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const accessToken: any = req.query.accessToken
            const result = await AuthenService.logout(accessToken)
            res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    }
}

export default new AuthController()