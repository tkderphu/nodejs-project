import { createPaymentUrl } from "../../third/vnpay/Vnpay"
import { getUserLoggined } from "../framework/common/auth"
import TransactionService from "../service/TransactionService"

class TransactionController {
    addFlower(req: any, res: any, next: any) {
     


    }

    createTransaction(req: any, res: any, next: any) {
        const {amount} = req.body
        
        const url = createPaymentUrl(req,res, next, {
            userId: getUserLoggined(req).userId,
            amount: amount
        })

        res.status(200).send(url)
    }

    getTransaction(req: any, res: any, next: any) {
        TransactionService.getListTransaction(getUserLoggined(req).userId)
        .then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            next(err)
        })
    }
    
}
export default new TransactionController()