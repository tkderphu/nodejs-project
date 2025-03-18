import { compare, genSalt, hash } from "bcrypt"

export const getUserLoggined = (req: any): { roles: string[], userId: string } => {
    return {
        userId: req.userId,
        roles: req.roles
    }
}
export const hashPassword = async (password: string) => {
    const saltRound = 10
    const salt = await genSalt(saltRound)
    const hashPassword = await hash(password, salt)

    return hashPassword
}
export const compareHash = async (password: string, hashPassword: string) => {
    const result = await compare(password, hashPassword)
    if(result) return true;
    return false;
}