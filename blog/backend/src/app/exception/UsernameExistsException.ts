class UsernameExistsException extends Error {
    status = 400
    constructor(message: string) {
        super(message)
    }
}
export default UsernameExistsException