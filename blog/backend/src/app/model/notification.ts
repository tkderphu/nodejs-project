
export interface Notification {
    content: string,
    type: "COMMENT" | "POST"
}


//backend using redis => publish to who created post
//frontend subscribe all following for receive message