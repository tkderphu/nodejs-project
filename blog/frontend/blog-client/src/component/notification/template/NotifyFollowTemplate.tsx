import { Link } from "react-router-dom"

export default function NotifyFollowTemplate(props: {
    user: {
        avatar: string,
        fullname: string,
        _id: string
    },
    time: any
}) {
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
                    <Link to={"dv"} style={{textDecoration: "none", color: "black"}}><strong>{props.user.fullname}</strong> đã theo dõi bạn.</Link>
                </div>
                <small className="text-muted">{props.time}</small>
            </div>
            {/* </Link> */}
        </>
    )
}
