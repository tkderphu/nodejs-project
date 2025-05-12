import transactionService from "../../../../service/transaction.service"
import { CREATE_PAYMENT_URL_BEGIN, CREATE_PAYMENT_URL_FAILED } from "./transaction.action.type"

export const createPaymentUrlAction = (amount: number) => {
    console.log("what")
    return (dispatch: any) => {
        dispatch({
            type: CREATE_PAYMENT_URL_BEGIN
        })
        transactionService.createTransaction(amount).then(resp => {
            const url = resp.data
            window.open(url, "_blank")
        }).catch(err => {
            dispatch({
                type: CREATE_PAYMENT_URL_FAILED,
                payload: err
            })
        })
    }
} 