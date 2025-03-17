


export interface BookMark {
    id: string
    entityType: string
    entityId: string
    userId: string
}

export interface BookMarkReq {
    entityType: string
    userId: string
    entityId: string
}