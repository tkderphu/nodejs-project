export interface PageResult<T> {
    currentPage: number,
    list: T[],
    totalPage: number,
    totalItem: number
}