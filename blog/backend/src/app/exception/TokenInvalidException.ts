 class TokenInvalidException extends Error {
    
    status: number = 401
    constructor(message: string) {
        super(message)
    }
}

export default TokenInvalidException