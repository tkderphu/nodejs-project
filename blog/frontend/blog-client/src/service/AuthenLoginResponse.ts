

const jwt: any = JSON.parse(localStorage.getItem('jwt') || "")

export const getToken = () => {
    return jwt.accessToken
}
export const getRefreshToken = () => {
    return jwt.refreshToken
}

export const getUserLoggined = () => {
    return jwt.userId;
}

export const storeToken = (payload: any) => {
    localStorage.setItem('jwt', payload)
}