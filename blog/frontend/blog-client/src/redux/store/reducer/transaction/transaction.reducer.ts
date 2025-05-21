import { CREATE_PAYMENT_URL_BEGIN, CREATE_PAYMENT_URL_FAILED, CREATE_PAYMENT_URL_SUCCESS, FETCH_FLOWER_BEGIN, FETCH_FLOWER_FAILED, FETCH_FLOWER_SUCCESS, FETCH_TRANSACTION_BEGIN, FETCH_TRANSACTION_FAILED, FETCH_TRANSACTION_SUCCESS } from "../../action/transaction/transaction.action.type";

export const fetchFlowerReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case FETCH_FLOWER_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_FLOWER_SUCCESS: {
            return {
                loading: false,
                flower: action.payload
            }
        }
        case FETCH_FLOWER_FAILED: {
            return {
                loading: false,
                err: action.payload,
                hasError: true
            }
        }
        default: return state
    }
}

export const fetchTransactionReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case FETCH_TRANSACTION_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_TRANSACTION_SUCCESS: {
            return {
                loading: false,
                transactions: action.payload
            }
        }
        case FETCH_TRANSACTION_FAILED: {
            return {
                loading: false,
                err: action.payload,
                hasError: true
            }
        }
        default: return state
    }
}

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