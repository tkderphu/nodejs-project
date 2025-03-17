
export interface Series {
    userId: string
    title: string,
    content: string,
    taggings: string[],
    puslishedAt: any
    modifiedDate: any
    view: number
    bookmark: number,
    comment: number
    post: string[]
}

export interface SeriesDocument extends Series {

}