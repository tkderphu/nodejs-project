import { NextFunction, Request, Response } from "express";
import accessTokenRepository from "../app/dataobject/repository/access.token.repository";
import TokenInvalidException from "../app/exception/TokenInvalidException";
import JwtService from "../app/service/JwtService";
import SecurityContextHolder from "../app/common/SecurityContextHolder";


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
            const whetherTokenIsExists = await accessTokenRepository.findByToken(accessToken)
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