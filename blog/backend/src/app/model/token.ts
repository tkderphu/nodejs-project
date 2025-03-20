import { UserSimple } from "./user"

export interface RefreshToken {
    user: UserSimple
    token: string
}

export interface AccessToken {
    user: UserSimple
    token: string,
    refreshToken: string
}