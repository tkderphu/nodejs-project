
export interface PageResult<T> {
    currentPage: number,
    totalPage: number,
    list: Array<T>
}

export interface PageParam {
    page: number
    limit: number
}