export interface RefreshToken {
    userId: string
    token: string
}

export interface AccessToken {
    userId: string
    token: string,
    refreshToken: string
}