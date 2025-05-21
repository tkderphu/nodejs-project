import flowerService from "../../../../service/flower.service"
import transactionService from "../../../../service/transaction.service"
import { CREATE_PAYMENT_URL_BEGIN, CREATE_PAYMENT_URL_FAILED, CREATE_PAYMENT_URL_SUCCESS, FETCH_FLOWER_BEGIN, FETCH_FLOWER_FAILED, FETCH_FLOWER_SUCCESS, FETCH_TRANSACTION_BEGIN, FETCH_TRANSACTION_FAILED, FETCH_TRANSACTION_SUCCESS } from "./transaction.action.type"

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


export const fetchTransactionAction = () => {
    console.log("what")
    return (dispatch: any) => {
        dispatch({
            type: FETCH_TRANSACTION_BEGIN
        })
        transactionService.fetchTransaction().then(resp => {
            dispatch({
                type: FETCH_TRANSACTION_SUCCESS,
                payload: resp.data
            })
        }).catch(err => {
            dispatch({
                type: FETCH_TRANSACTION_FAILED,
                payload: err
            })
        })
    }
} 



export const fetchFlowerAction = () => {
    return (dispatch: any) => {
        dispatch({
            type: CREATE_PAYMENT_URL_SUCCESS
        })
        dispatch({
            type: FETCH_FLOWER_BEGIN
        })
        flowerService.getFlowerByUser().then(resp => {
            dispatch({
                type: FETCH_FLOWER_SUCCESS,
                payload: resp.data
            })
        }).catch(err => {
            dispatch({
                type: FETCH_FLOWER_FAILED,
                payload: err
            })
        })
    }
} 