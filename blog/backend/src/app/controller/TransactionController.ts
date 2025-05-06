import { getUserLoggined } from "../framework/common/auth"
import TransactionService from "../service/TransactionService"

class TransactionController {
    addFlower(req: any, res: any, next: any) {

    }

    getTransaction(req: any, res: any, next: any) {
        // TransactionService.getListTransaction(getUserLoggined(req).userId)
        // .then(resp => {
        //     res.status(200).send(resp)
        // }).catch(err => {
        //     next(err)
        // })
    }
    
}
export default new TransactionController()