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
import ProfileEmbedded from "./ProfileEmbedded"
import ProfileInfo from "./ProfifleInfo"
import ProfileUpdate from "./ProfifleInfo"
import ProfileFlower from "./ProfileFlower"
function Profile() {
    const { id } = useParams() || ''
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
    }, [id])
    return (
        <>
            <AlertConponent error={state.error} loading={state.loading} hasError={state.hasError} />
            {!state.hasError && !state.loading && (
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-lg-8 col-md-7">
                            <div className="profile-header d-flex justify-content-between flex-wrap">
                                <div className="d-flex align-items-center">
                                    <img src={state.user?.image_url} alt="User Avatar" />
                                    <div className="d-flex flex-column">
                                        <strong>{state.user?.fullName}</strong>
                                        {state.user?.nickname && (<p>@{state.user?.nickname}</p>)}
                                        {/* <button className="btn btn-sm btn-outline-secondary ms-auto">follower</button> */}
                                    </div>
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

                                {(id == getUserLoggined()._id || '') && <div className="d-flex">
                                    <ProfileFlower userId={state.user?._id} />
                                    <ProfileInfo info={state.user} />
                                </div>}

                            </div>
                            <div className="mb-2 text-start"><span>{state.user?.bio}</span></div>
                            <ul className="nav nav-tabs">
                                <li className="nav-item"><Link className={`nav-link ${useTab === "POST" ? "active" : ""}`} to={'posts'} onClick={() => setUseTab("POST")}>Bài viết</Link></li>
                                <li className="nav-item"><Link className={`nav-link ${useTab === "SERIES" ? "active" : ""}`} to={"series"} onClick={() => setUseTab("SERIES")}>Series</Link></li>
                                <li className="nav-item"><Link className={`nav-link ${useTab === "BOOKMARK" ? "active" : ""}`} to={"bookmarks"} onClick={() => setUseTab("BOOKMARK")}>Bookmark</Link></li>
                                <li className="nav-item"><Link className={`nav-link ${useTab === "FOLLOWING" ? "active" : ""}`} to={"followings"} onClick={() => setUseTab("FOLLOWING")}>Đang theo dõi</Link></li>
                                <li className="nav-item"><Link className={`nav-link ${useTab === "FOLLOWER" ? "active" : ""}`} to={"followers"} onClick={() => setUseTab("FOLLOWER")}>Người theo dõi</Link></li>
                                {/* <li className="nav-item"><Link className={`nav-link ${useTab==="TAG" ? "active" : ""}`} to={"tags"} onClick={() => setUseTab("TAG")}>Thẻ</Link></li> */}
                            </ul>

                            <div className="content-box">
                                <Outlet />
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-5">
                            <div className="stats-box">
                                {(id == getUserLoggined()._id || '') && <ProfileEmbedded socialPlatform={state.user?.socialNetworkPlatform} />}
                                {state.user?.socialNetworkPlatform && (
                                    <div className="mb-2 p-2" style={{
                                        backgroundColor: "#c9cdd1",
                                        border: "1px",
                                        height: "130px",
                                        borderRadius: "10px"
                                    }}>
                                        <div className="text-truncate">Github: <a href={state.user.socialNetworkPlatform.github} target={"_blank"}>{state.user.socialNetworkPlatform.github}</a></div>
                                        <div className="text-truncate">Instagram: <a href={state.user.socialNetworkPlatform.instagram} target={"_blank"}>{state.user.socialNetworkPlatform.instagram}</a></div>
                                        <div className="text-truncate">Twitter: <a href={state.user.socialNetworkPlatform.twitter} target={"_blank"}>{state.user.socialNetworkPlatform.twitter}</a></div>
                                        <div className="text-truncate">Linkln: <a href={state.user.socialNetworkPlatform.linkedln} target={"_blank"}>{state.user.socialNetworkPlatform.linkedln}</a></div>
                                        <div className="text-truncate">Website: <a href={state.user.socialNetworkPlatform.yoursite} target={"_blank"}>{state.user.socialNetworkPlatform.yoursite}</a></div>
                                    </div>
                                )}
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