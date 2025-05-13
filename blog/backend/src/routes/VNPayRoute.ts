import express from 'express';
import moment from 'moment';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
import querystring from 'qs'
import { returnUrl } from '../third/vnpay/Vnpay';
dotenv.config()
const router = express.Router();



router.get('/vnpay_return', (req: Request, res: Response, next: NextFunction) => {
    returnUrl(req, res).then((resp) => {
        res.status(200).send(resp)
    }).catch(err => {
        next(err)
    })
})

export default router