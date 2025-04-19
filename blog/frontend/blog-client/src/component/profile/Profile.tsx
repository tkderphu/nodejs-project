import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet, useParams } from "react-router-dom"
import { UserProfile } from "../../model/User"
import { checkFollowedUserAction, followObjectAction, unfollowObjectAction } from "../../redux/store/action/follow/follow.action"
import { fetchProfileAction } from "../../redux/store/action/profile/profile.action"
import { getUserLoggined } from "../../service/AuthenLoginResponse"
import profileService from "../../service/profile.service"
import AlertConponent from "../common/AlertComponent"
import Modal from "../common/Modal"
import Post from "../post/PostSimple"
import "./Profile.css"
function Profile() {
    const { id } = useParams()
    const state: {
        error: any, hasError: boolean, user: UserProfile, loading: boolean
    } = useSelector((state: any) => {
        return state.fetchProfile
    })

    const stateFolow: {
        followed: boolean,
        hasError: boolean,
        error: any
    } = useSelector((state: any) => {
        return state.checkFollowedUser
    })

    
    const [useTab, setUseTab] = useState<"POST" | "SERIES" | "BOOKMARK" | "FOLLOWING" | "FOLLOWER" | "TAG">("POST")

    const dispatch = useDispatch()
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchProfileAction(id || ""))
        //@ts-ignore
        dispatch(checkFollowedUserAction(id || "", "USER"))
    }, [])
    return (
        <>
            <AlertConponent error={state.error} loading={state.loading} hasError={state.hasError} />
            {!state.hasError && !state.loading && (
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-lg-8 col-md-7">
                            <div className="profile-header mb-3">
                                <img src={state.user?.image_url} alt="User Avatar" />
                                <div>
                                    <h4>{state.user?.fullName}</h4>
                                    <p className="text-muted">@quangphu</p>
                                </div>
                                {getUserLoggined()._id != id && <div className="d-flex flex-column">
                                    <button className="btn btn-outline-primary edit-btn" onClick={() => {
                                        if (stateFolow.followed) {
                                            //@ts-ignore
                                            dispatch(unfollowObjectAction(id, "USER"))
                                        } else {
                                            //@ts-ignore
                                            dispatch(followObjectAction(id, "USER"))
                                        }
                                    }} type="button">{stateFolow.followed ? "Hủy theo dõi" : "Theo dõi"}</button>
                                    {stateFolow.hasError && <AlertConponent hasError={stateFolow.hasError} error={state.error} loading={state.loading} />}
                                </div>}
                                <button className="btn btn-outline-primary edit-btn" type="button" data-toggle="modal" data-target='.profile-user'>Sửa</button>
                                <Modal dataTarget="profile-user" />
                            </div>

                            <ul className="nav nav-tabs">
                                <li className="nav-item"><Link className="nav-link active" to={'/posts'}>Bài viết</Link></li>
                                <li className="nav-item"><Link className="nav-link" to={"followings"}>Series</Link></li>
                                <li className="nav-item"><Link className="nav-link" to={"followings"}>Bookmark</Link></li>
                                <li className="nav-item"><Link className="nav-link" to={"followings"}>Đang theo dõi</Link></li>
                                <li className="nav-item"><Link className="nav-link" to={"followings"}>Người theo dõi</Link></li>
                                <li className="nav-item"><Link className="nav-link" to={"followings"}>Thẻ</Link></li>
                            </ul>

                            <div className="content-box">
                                <Outlet/>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-5">
                            <div className="stats-box">
                                <Modal dataTarget="social-embedded" />
                                <button className="btn btn-light w-100 mb-2" data-toggle="modal" data-target='.social-embedded'>Nhúng trang cá nhân</button>
                                <div className="stats-item"><span>Các thẻ theo dõi</span> <strong>{state.user?.followTags}</strong></div>
                                <div className="stats-item"><span>Đang theo dõi các người dùng</span> <strong>{state.user?.followings}</strong></div>
                                <div className="stats-item"><span>Các người dùng đang theo dõi</span> <strong>{state.user?.followers}</strong></div>
                                <div className="stats-item"><span>Bài viết</span> <strong>{state.user?.posts}</strong></div>
                                <div className="stats-item"><span>Bookmark</span> <strong>{state.user?.bookmark}</strong></div>
                                <div className="stats-item"><span>Tổng số binh luan</span> <strong>{state.user?.comments}</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default Profile