import { NextFunction, Request, Response } from "express";
import TokenInvalidException from "../app/exception/TokenInvalidException";
import JwtService from "../app/service/JwtService";
import SecurityContextHolder from "../app/framework/common/SecurityContextHolder";
import TokenService from "../app/service/TokenService";


export const authMiddleWare = async (req: any, res: Response, next: NextFunction) => {
    const accessToken = req.headers['authorization']?.substring(7) || ""
    if (!accessToken) {
        res.status(401).send("Access Denied")
    }
    else if (JwtService.tokenIsExpired(accessToken)) {
        res.status(401).send("Unauthorized")
    }
    else {
        try {
            const whetherTokenIsExists = await TokenService.findAccessToken(accessToken)
            if (!whetherTokenIsExists) {
                res.send(401).send("Invalid token")
            }
            const payload = JwtService.getPayload(accessToken)
            SecurityContextHolder.setAuthentication(payload.userId, payload.roles)
            next()
        } catch (err) {
            res.status(401).send("Unauthorized")
        }
    }

}

export const handlerExceptionMiddleWare = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(err.status).json({ error: err.message });
}