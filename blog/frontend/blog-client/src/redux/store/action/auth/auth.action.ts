
import path from "path"
import authService from "../../../../service/auth.service"
import { storeToken } from "../../../../service/AuthenLoginResponse"
import { AUTH_FORGET_PASSWORD_BEGIN, AUTH_FORGET_PASSWORD_FAILED, AUTH_FORGET_PASSWORD_SUCCESS, AUTH_LOGIN_BEGIN, AUTH_LOGIN_FAILED, AUTH_LOGIN_SUCCESS, AUTH_REGISTER_BEGIN, AUTH_REGISTER_FAILED, AUTH_REGISTER_SUCCESS } from "./auth.action.type"

/**
 * Login action
 */
export const authLoginBegin = () => {
    return {
        type: AUTH_LOGIN_BEGIN
    }
}
export const authLoginSuccess = (payload: any) => {
    return {
        type: AUTH_LOGIN_SUCCESS,
        payload: payload
    }
}
export const authLoginFailed = (err: any) => {
    return {
        type: AUTH_LOGIN_FAILED,
        payload: err
    }
}

export const authLoginAction = (email: string, password: string) => {
    return (dispatch: any) => {
        dispatch(authLoginBegin())
        authService.login({email, password}).then(result => {
            storeToken(JSON.stringify(result.data))
            dispatch(authLoginSuccess(result))
            location.href = '/'
        }).catch(err => {
            console.log("failed")
            dispatch(authLoginFailed(err))
        })
    } 
}


export const authRegisterBegin = () => {
    return {
        type: AUTH_REGISTER_BEGIN
    }
}
export const authRegisterSuccess = (userLoggined: any) => {
    return {
        type: AUTH_REGISTER_SUCCESS,
        payload: userLoggined
    }
}

export const authRegisterFailed = (error: any) => {
    return {
        type: AUTH_REGISTER_FAILED,
        payload: error
    }
}

export const authRegisterAction = (req: any) => {
    return (dispatch: any) => {
        dispatch(authLoginBegin())
        authService.register(req).then(res => {
            dispatch(authLoginSuccess(res))
        }).catch(err => {
            dispatch(authRegisterFailed(err))
        })
    }
}

export const authForgetPasswordBegin = () => {
    return {
        type: AUTH_FORGET_PASSWORD_BEGIN
    }
}
export const authForgetPasswordSuccess = (payload: any) => {
    return {
        type: AUTH_FORGET_PASSWORD_SUCCESS,
        payload: payload
    }
}

export const authForgetPasswordFailed = (err: any) => {
    return {
        type: AUTH_FORGET_PASSWORD_FAILED,
        payload: err
    }
}

export const authForgetPasswordAction = (email: string) => {
    return (dispatch: any) => {
        dispatch(authForgetPasswordBegin())
        authService.forgetPassword(email).then(result => {
            dispatch(authForgetPasswordSuccess(result))
        }).catch(err => {
           dispatch( authForgetPasswordFailed(err))
        })
    }
}

export const authRedirect = () => {
    
}