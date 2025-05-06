import express from 'express';
import moment from 'moment';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
import querystring from 'qs'
dotenv.config()
const router = express.Router();


const config: any = {
    vnp_TmnCode: "A29BWRK7",
    vnp_HashSecret: "AG8I0GZLCRRW27AMD20I7XY6CF4PUHU0",
    vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    vnp_ReturnUrl: "http://localhost:5000/vnpay_returnUrl"

}

function sortObject(obj: { [key: string]: any }): { [key: string]: any } {
    // Convert the object into an array of [key, value] pairs
    const sortedEntries = Object.entries(obj).sort(([keyA], [keyB]) => {
        // Compare the keys alphabetically
        return keyA.localeCompare(keyB);
    });

    // Convert the sorted entries back into an object
    return Object.fromEntries(sortedEntries);
}


router.post('/create_payment_url', (req: Request, res: Response, next: NextFunction) => {
    process.env.TZ = 'Asia/Ho_Chi_Minh';

    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');

    //@ts-ignore
    const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    const tmnCode = config['vnp_TmnCode'] as string;
    const secretKey = config['vnp_HashSecret'] as string;
    let vnpUrl = config['vnp_Url'] as string;
    const returnUrl = config['vnp_ReturnUrl'] as string;
    const orderId = moment(date).format('DDHHmmss');
    const amount = req.body.amount;
    const bankCode = req.body.bankCode;

    let locale = req.body.language || 'vn';
    const currCode = 'VND';
    const vnpParams: any = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: tmnCode,
        vnp_Locale: locale,
        vnp_CurrCode: currCode,
        vnp_TxnRef: orderId,
        vnp_OrderInfo: `Thanh toan cho ma GD:${orderId}`,
        vnp_OrderType: 'other',
        vnp_Amount: amount * 100,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate,
    };
    if (bankCode) {
        vnpParams['vnp_BankCode'] = bankCode;
    }

    const redirectUrl = new URL(vnpUrl);

    // Step 1: Sort and append valid parameters
    Object.entries(vnpParams)
        .sort(([key1], [key2]) => key1.toString().localeCompare(key2.toString()))
        .forEach(([key, value]) => {
            if (value === "" || value === undefined || value === null) return;
            redirectUrl.searchParams.append(key, value.toString());
        });

    // Step 2: Generate HMAC SHA-512 signature
    const hmac = crypto.createHmac("sha512", secretKey);
    const queryString = redirectUrl.search.slice(1).toString(); // remove leading '?'

    const signed = hmac
        .update(Buffer.from(queryString, "utf-8"))
        .digest("hex");

    // Step 3: Append signature
    redirectUrl.searchParams.append("vnp_SecureHash", signed);

    res.status(200).send(redirectUrl)
});

router.get('/vnpay_return', (req: Request, res: Response, next: NextFunction) => {
    const vnpParams = req.query as Record<string, string>;
    const secureHash = vnpParams['vnp_SecureHash'];
    delete vnpParams['vnp_SecureHash'];
    delete vnpParams['vnp_SecureHashType'];

    const sortedParams = sortObject(vnpParams);
    const tmnCode = config['vnp_TmnCode'] as string;
    const secretKey = config['vnp_HashSecret'] as string;

    const querystring = require('qs');
    const signData = querystring.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
        res.render('success', { code: vnpParams['vnp_ResponseCode'] });
    } else {
        res.render('success', { code: '97' });
    }
});

router.get('/vnpay_ipn', (req: Request, res: Response, next: NextFunction) => {
    const vnpParams = req.query as Record<string, string>;
    const secureHash = vnpParams['vnp_SecureHash'];

    const orderId = vnpParams['vnp_TxnRef'];
    const rspCode = vnpParams['vnp_ResponseCode'];

    delete vnpParams['vnp_SecureHash'];
    delete vnpParams['vnp_SecureHashType'];

    const sortedParams = sortObject(vnpParams);
    const secretKey = config['vnp_HashSecret'] as string;
    const querystring = require('qs');
    const signData = querystring.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

    let paymentStatus = '0'; // Assuming '0' is the initial state
    const checkOrderId = true; // Assume the order exists in the DB
    const checkAmount = true; // Assume the amount is valid

    if (secureHash === signed) {
        if (checkOrderId) {
            if (checkAmount) {
                if (paymentStatus === "0") {
                    if (rspCode === "00") {
                        res.status(200).json({ RspCode: '00', Message: 'Success' });
                    } else {
                        res.status(200).json({ RspCode: '00', Message: 'Success' });
                    }
                } else {
                    res.status(200).json({ RspCode: '02', Message: 'This order has been updated to the payment status' });
                }
            } else {
                res.status(200).json({ RspCode: '04', Message: 'Amount invalid' });
            }
        } else {
            res.status(200).json({ RspCode: '01', Message: 'Order not found' });
        }
    } else {
        res.status(200).json({ RspCode: '97', Message: 'Checksum failed' });
    }
});

export default router