import { AUTH_FORGET_PASSWORD_BEGIN, AUTH_FORGET_PASSWORD_FAILED, AUTH_FORGET_PASSWORD_SUCCESS, AUTH_LOGIN_BEGIN, AUTH_LOGIN_FAILED, AUTH_LOGIN_SUCCESS, AUTH_REGISTER_BEGIN, AUTH_REGISTER_FAILED, AUTH_REGISTER_SUCCESS } from "../../action/auth/auth.action.type"


const authLoginState: any = {
    loading: false,
    status: '',
    message: "",
    hasError: false
}
export const authLoginReducer = (state = authLoginState, action: any) => {
    switch(action.type) {
        case AUTH_LOGIN_BEGIN: {
            return {
                ...state,
                loading: true
            }
        }
        case AUTH_LOGIN_SUCCESS: {
            return {
                loading: false,
                status: '',
                message: '',
                hasError: false
            }
        }
        case AUTH_LOGIN_FAILED: {
            return {
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                hasError: true
            }
        }
    }
}
const authRegisterState: any = {
    hasError: false,
    loading: false,
    status: '',
    message: ''
}
export const authRegisterReducer = (state = authRegisterState, action: any) => {
    switch(action.type) {
        case AUTH_REGISTER_BEGIN: {
            return {
                ...state,
                loading: true
            }
        }
        case AUTH_REGISTER_SUCCESS: {
            return {
                hasError: false,
                loading: false,
                status: '',
                message: ''
            }
        }
        case AUTH_REGISTER_FAILED: {
            return {
                hasError: true,
                loading: false,
                status: action.payload.status,
                message: action.payload.message
            }
        }
    }
}


const authForgetPasswordState: any = {
    hasError: false,
    loading: false,
    status: '',
    message: '',
    response: ''
}
export const authForgetPasswordReducer = (state = authForgetPasswordState, action: any) => {
    switch(action.type) {
        case AUTH_FORGET_PASSWORD_BEGIN: {
            return {
                ...state,
                loading: true
            }
        }
        case AUTH_FORGET_PASSWORD_SUCCESS: {
            return {
                hasError: false,
                loading: false,
                status: '',
                message: '',
                response: action.payload
            }
        }
        case AUTH_FORGET_PASSWORD_FAILED: {
            return {
                hasError: true,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                response: ''
            }
        }
    }
}