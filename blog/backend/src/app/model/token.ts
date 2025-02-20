export interface RefreshToken {
    userId: string
    token: string
}

export interface AccessToken {
    token: string,
    refreshToken: string
}