export default function NotifyPostTemplate(props: {
    time: any,
    params: {
        author: { avatar: string, fullName: string },
        post: { title: string, _id: string }
    },
    read: boolean
}) {
    return (
        <li className={`list-group-item notify-background d-flex align-items-start ${!props.read ? '' : "text-muted"}`}>
            <img
                src={props.params.author.avatar}
                alt="avatar"
                className="rounded-circle me-3"
                width="40"
                height="40"
            />
            {/* <Link to={"vc"}> */}
            <div className="flex-grow-1">
                <div className="mb-1">
                    <strong>{props.params.author.fullName}</strong> đã đăng một bài viết mới là 
                    <span className="text-primary ms-1">{props.params.post.title}</span>.

                </div>
                <small className="text-muted">{props.time}</small>
            </div>
            {/* </Link> */}
        </li>
    )
}