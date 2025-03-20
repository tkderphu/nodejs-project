import { UserSimple } from "./user"

export interface AuthLogin {
    email: string
    password: string
}

export interface AuthRegister{
    email: string,
    fullName: string,
    password: string,
}

export interface AuthLoginResp {
    user: UserSimple
    accessToken: string
    refreshToken: string
    expiredAt: number
}