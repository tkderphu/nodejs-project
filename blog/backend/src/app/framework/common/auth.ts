
export const getUserLoggined = (req: any): {roles: string[], userId: string} => {
    return {
        userId: req.userId,
        roles: req.roles
    }
}