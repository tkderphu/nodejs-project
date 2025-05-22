export interface Setting {
    userId: string
    notification: {
        fromFollowing: boolean,
        fromCommentInteraction: boolean
        fromLikeInteraction: boolean,
        allowPushNotifyMessage: boolean,
        allowNotifySound: boolean
    }
}