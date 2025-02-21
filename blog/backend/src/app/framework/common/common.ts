
export interface PageResult<T> {
    currentPage: number,
    totalPage: number,
    list: Array<T>
}

export interface PageParam {
    page: number
    limit: number
}


export const getUserLoggined = (req: any): {roles: string[], userId: string} => {
    return {
        userId: req.userId,
        roles: req.roles
    }
}