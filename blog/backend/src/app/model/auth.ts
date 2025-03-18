
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
    userFullName: string
    userId: string
    accessToken: string
    refreshToken: string
    expiredAt: number
}