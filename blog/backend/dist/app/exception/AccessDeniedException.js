class AccessDeniedException extends Error {
    constructor(message) {
        super(message);
        this.status = 403;
    }
}
export default AccessDeniedException;
