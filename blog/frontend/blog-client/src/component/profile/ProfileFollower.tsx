import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { Author } from "../../model/User"
import { fetchFollowersAction } from "../../redux/store/action/follow/follow.action"
import { getUserLoggined } from "../../service/AuthenLoginResponse"
import socket from "../../socket/socket"
import AlertConponent from "../common/AlertComponent"

export default function ProfileFollower() {
    const { id } = useParams()
    const state: {
        loading: false,
        hasError: boolean,
        error: any,
        followers: {
            user: Author
        }[]
    } = useSelector((state: any) => {
        return state.fetchFollowers
    })

    console.log('state: ', state)
    const dispatch = useDispatch()
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchFollowersAction(id, "USER"))
    }, [])

  

    console.log("state: ", state)
    if (state.loading || state.hasError) {
        return <AlertConponent loading={state.loading} hasError={state.hasError} error={state.error} />
    }

    return (
        <div className="d-flex flex-wrap">
            {state.followers && state.followers.map(follower => {
                console.log("follower:", follower)
                return (
                    <div className="d-flex mx-3">
                        <img
                            src={follower.user.image_url}
                            alt="Avatar"
                            className="rounded-circle"
                            width="50"
                            height="50"
                        />
                        <div className="d-flex justify-content-between">
                            <div>
                                <strong><Link style={{textDecoration:"none"}}  to={`/profile/${follower.user._id}`}>{follower.user.fullName}</Link></strong>
                                {/* <button className="btn btn-sm btn-outline-secondary ms-auto">follower</button> */}
                                <br />
                                <div className="d-flex justify-content-around">
                                    <small className="text-muted d-flex align-items-center" style={{ fontSize: "18px" }}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                    </svg><span>{follower.user.followers}</span></small>
                                    <small className="text-muted d-flex align-items-center" style={{ fontSize: "18px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                        <span>{follower.user.posts}</span>
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div />
                    </div>
                )
            })}
        </div>
    )
}