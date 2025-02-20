 class UsernameOrPasswordNotMatchException extends Error {
    status: number = 404
    constructor(message: string) {
        super(message)
    }
}
export default UsernameOrPasswordNotMatchException