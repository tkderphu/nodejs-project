

const jwt: any = JSON.parse(localStorage.getItem('jwt') || "{}")

export const getToken = () => {
    return jwt.accessToken
}
export const getRefreshToken = () => {
    return jwt.refreshToken
}

export const getUserLoggined = (): {_id: string, fullName: string, role: "admin" | "user"} => {
    return jwt.user || {};
}

export const storeToken = (payload: any) => {
    localStorage.setItem('jwt', payload)
}