export interface PageResult<T> {
    currentPage: number,
    totalPage: number,
    list: Array<T>,
    totalItem?: number
}

export interface PageParam {
    page: number
    limit: number
}
export const totalPage = (limit: number, list: Array<any>) => {
    return Math.ceil(list.length / limit)
}
export const startFrom = (page: number, limit: number) => {
    return (page - 1) * limit
}