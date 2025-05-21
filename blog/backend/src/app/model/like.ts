export interface Like {
    userId: string
    typeId: string,
    type: "COMMENT" | "POST"
}

export interface LikeDocument extends Like {
    _id: string
}
