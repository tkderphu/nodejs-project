
class AccessDeniedException extends Error {
    status = 403
    constructor(message: string) {
        super(message)
    }
}   
export default AccessDeniedException