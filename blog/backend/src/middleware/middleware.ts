import { NextFunction, Request, Response } from "express";
import TokenInvalidException from "../app/exception/TokenInvalidException";
import JwtService from "../app/service/JwtService";
import TokenService from "../app/service/TokenService";


export const authMiddleWare = async (req: any, res: Response, next: NextFunction) => {
    const accessToken = req.headers['authorization']?.substring(7) || ""
    if (!accessToken) {
        console.log("loz")
        res.status(401).send("Access Denied")
    }
    else if (JwtService.tokenIsExpired(accessToken)) {
        console.log("loz2")
        res.status(401).send("Unauthorized")
    }
    else {
        try {
            const whetherTokenIsExists = await TokenService.findAccessToken(accessToken)
            if (!whetherTokenIsExists) {
                res.send(401).send("Invalid token")
            }
            const payload = JwtService.getPayload(accessToken)
            req.userId = payload.userId
            req.roles = payload.roles
            next()
        } catch (err: any) {
            console.log("cai loz gi the")
            res.status(401).send("Unauthorized")
        }
    }

}

export const handlerExceptionMiddleWare = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    console.log("vllllllllllllll-")
    res.status(err.status || 500).json({ error: err.message });
}