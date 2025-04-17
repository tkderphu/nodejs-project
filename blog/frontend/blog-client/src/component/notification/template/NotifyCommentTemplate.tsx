export default function NotifyCommentTemplate(props: { time: any, user: { fullName: string, avatar: string }, post: { title: string, _id: string }}) {
    return (
        <>
            <img
                src={props.user.avatar}
                alt="avatar"
                className="rounded-circle me-3"
                width="40"
                height="40"
            />
            {/* <Link to={"vc"}> */}
            <div className="flex-grow-1">
                <div className="mb-1">
                    <strong>{props.user.fullName}</strong> đã bình luận về bài viết
                    <span className="text-primary ms-1">{props.post.title}</span> của bạn.
                </div>
                <small className="text-muted">{props.time}</small>
            </div>
            {/* </Link> */}
        </>
    )
}       