export default class TokenIsExpiredException extends Error{
    status: number = 401
    constructor(message: string) {
        super(message)
    }
}