export default class UsernameOrPasswordNotMatchException extends Error {
    status: number = 404
    constructor(message: string) {
        super(message)
    }
}