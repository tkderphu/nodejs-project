import { CREATE_PAYMENT_URL_BEGIN, CREATE_PAYMENT_URL_FAILED, CREATE_PAYMENT_URL_SUCCESS } from "../../action/transaction/transaction.action.type";


export const createPaymentReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case CREATE_PAYMENT_URL_BEGIN: {
            return {
                loading: true
            }
        }
        case CREATE_PAYMENT_URL_SUCCESS: {
            return {
                loading: false
            }
        }
        case CREATE_PAYMENT_URL_FAILED: {
            return {
                loading: false,
                err: action.payload,
                hasError: true
            }
        }
        default: return state
    }
}