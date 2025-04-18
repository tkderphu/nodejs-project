export default function NotifyReplyCommentTemplate(props: {
    time: any,
    params: {
        oldComment: {
            _id: string,
            user: {
                _id: string,
                fullName: string
            }
        },
        user: { fullName: string, avatar: string },
        post: { title: string, _id: string }
    },
    read: boolean
}) {
    return (
        <li className={`list-group-item notify-background d-flex align-items-start ${!props.read ? '' : "text-muted"}`}>
            <img
                src={props.params.user.avatar}
                alt="avatar"
                className="rounded-circle me-3"
                width="40"
                height="40"
            />
            {/* <Link to={"vc"}> */}
            <div className="flex-grow-1">
                <div className="mb-1">
                    <strong>{props.params.user.fullName}</strong> đã phản hồi về bình luận của bạn trong bài viết
                    <span className="text-primary ms-1">{props.params.post.title}</span>.
                </div>
                <small className="text-muted">{props.time}</small>
            </div>
            {/* </Link> */}
        </li>
    )
}