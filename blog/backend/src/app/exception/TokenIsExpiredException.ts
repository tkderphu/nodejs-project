export default class TokenIsExpiredException extends Error{
    constructor(message: string) {
        super(message)
    }
}