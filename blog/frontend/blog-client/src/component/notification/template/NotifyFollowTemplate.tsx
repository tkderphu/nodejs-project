import { Link, useNavigate } from "react-router-dom"

export default function NotifyFollowTemplate(props: {
    params: {
        user: {
            avatar: string,
            fullname: string,
            _id: string
        }
    }
    time: any,
    read: boolean
}) {
    const navigate = useNavigate()
    return (
        <li onClick={() => {
            navigate(`/profile/${props.params.user._id}`)
        }}  className={`list-group-item notify-background d-flex align-items-start  ${!props.read ? '' : "text-muted"}`}>
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
                    <Link to={"dv"} style={{textDecoration: "none", color: "black"}}><strong>{props.params.user.fullname}</strong> đã theo dõi bạn.</Link>
                </div>
                <small className="text-muted">{props.time}</small>
            </div>
            {/* </Link> */}
        </li>
    )
}
