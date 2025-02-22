export interface PageResult<T> {
    currentPage: number,
    totalPage: number,
    list: Array<T>
}

export interface PageParam {
    page: number
    limit: number
}
export const totalPage = (pageParam: PageParam, list: Array<any>) => {
    return Math.ceil(list.length / pageParam.limit)
}
export const startFrom = (pageParam: PageParam) => {
    return (pageParam.page - 1) * pageParam.limit
}