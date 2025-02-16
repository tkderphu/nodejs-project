export default class UsernameOrPasswordNotMatchException extends Error {
    constructor(message: string) {
        super(message)
    }
}