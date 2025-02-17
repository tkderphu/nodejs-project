import { NextFunction, Request, Response } from "express";


export const  authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
        
}

export const handlerExceptionMiddleWare = (err: Error, req: Request, res: Response) => {
    res.send("Something wrong")
}