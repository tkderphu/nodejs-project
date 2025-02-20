import {User, UserBase} from './user'
export interface AuthLogin {
    email: string
    password: string
}

export interface AuthRegister extends User{
    
}

export interface AuthLoginResp extends UserBase{
    userId: string
    accessToken: string
    refreshToken: string
    expiredAt: number
}