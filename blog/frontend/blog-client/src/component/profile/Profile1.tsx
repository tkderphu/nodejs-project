import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet, useParams } from "react-router-dom"
import { UserProfile } from "../../model/User"
import { checkFollowedUserAction, followObjectAction, unfollowObjectAction } from "../../redux/store/action/follow/follow.action"
import { fetchProfileAction } from "../../redux/store/action/profile/profile.action"
import { getUserLoggined } from "../../service/AuthenLoginResponse"
import AlertConponent from "../common/AlertComponent"
import ProfileInfo from "./ProfifleInfo"
import "./Profile.css"
import ProfileEmbedded from "./ProfileEmbedded"
import ProfileFlower from "./ProfileFlower"
const NAV = [
    {
        path: "posts",
        name: "Bài viết",
        icon: "fas fa-file-alt"
    },
    {
        path: "series",
        name: "Series",
        icon: "fas fa-layer-group"
    },
    {
        path: "bookmarks",
        name: "Bookmark",
        icon: "fas fa-bookmark"
    },
    {
        path: "followings",
        name: "Đang theo dõi",
        icon: "fas fa-users"
    },
    {
        path: "followers",
        name: "Người theo dõi",
        icon: "fas fa-user-friends"
    }
]
export default function Profile1() {
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


    const [useNav, setUseNav] = useState("posts")

    const dispatch = useDispatch()
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchProfileAction(id || ""))
        //@ts-ignore
        dispatch(checkFollowedUserAction(id || "", "USER"))
    }, [id])
    return (<>
        <div className="container py-4">
            {/* Profile Header */}
            <div className="profile-header p-4 mb-4">
                <div className="row align-items-center">
                    <div className="col-md-auto text-center text-md-start mb-3 mb-md-0">
                        <img
                            src={state.user?.image_url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFy658atWnUHKBO3eC6zMg9jOpqZGByopgAg&s"}
                            alt="Profile Picture"

                            className="profile-pic"
                        />
                    </div>
                    <div className="col-md-6 text-start">
                        <h2 className="mb-1 fw-bold">{state.user?.fullName}</h2>
                        <p className="mb-2">@{state.user?.nickname}</p>

                        {getUserLoggined()._id != id && <div>
                            <button className="btn btn-outline-light btn-sm px-3"
                                onClick={() => {
                                    if (stateFolow.followed) {
                                        //@ts-ignore
                                        dispatch(unfollowObjectAction(id, "USER"))
                                    } else {
                                        //@ts-ignore
                                        dispatch(followObjectAction(id, "USER"))
                                    }
                                }}
                            >
                                <i className="fas fa-user-plus me-2" />
                                {stateFolow.followed ? "Hủy theo dõi" : "Theo dõi"}
                            </button>
                            {stateFolow.hasError && <AlertConponent hasError={stateFolow.hasError} error={state.error} loading={state.loading} />}
                        </div>}
                    </div>
                    <div className="col-md text-md-end mt-3 mt-md-0">
                        <div className="btn-group">
                            {(id == getUserLoggined()._id) && <>
                                <ProfileFlower userId={state.user?._id} />
                                <ProfileInfo info={state.user} />
                            </>}

                        </div>
                    </div>
                </div>
            </div>
            {/* Main Content Area */}
            <div className="row">
                {/* Left Column - Profile Details */}
                <div className="col-lg-4 ">
                    {/* Social Links Card */}
                    <div className="card stats-card mb-3">
                        <div className="card-header bg-white">
                            <h5 className="mb-2">Liên kết</h5>
                            {(id == getUserLoggined()._id || '') && <ProfileEmbedded socialPlatform={state.user?.socialNetworkPlatform} />}
                        </div>
                        <div className="card-body social-links">
                            {state.user?.socialNetworkPlatform?.github && (
                                <div className="d-flex text-start align-items-center ">
                                    <div className="bg-light p-2 rounded-circle me-3">
                                        <i className="fab fa-github text-dark" />
                                    </div>
                                    <div>
                                        <a href={state.user?.socialNetworkPlatform?.github} className="text-decoration-none">
                                            <small className="text-muted d-block">GitHub</small>

                                        </a>
                                    </div>
                                </div>
                            )}
                            {state.user?.socialNetworkPlatform?.instagram && (
                                <div className="d-flex align-items-center  text-start">
                                    <div className="bg-light p-2 rounded-circle me-3">
                                        <i className="fab fa-instagram text-danger" />
                                    </div>
                                    <div>
                                        <a href={state.user?.socialNetworkPlatform?.instagram} className="text-decoration-none">
                                            <small className="text-muted d-block">Instagram</small>
                                        </a>
                                    </div>
                                </div>
                            )}
                            {state.user?.socialNetworkPlatform?.twitter && (
                                <div className="d-flex align-items-center  text-start">
                                    <div className="bg-light p-2 rounded-circle me-3">
                                        <i className="fab fa-twitter text-primary" />
                                    </div>
                                    <div>
                                        <a href={state.user?.socialNetworkPlatform?.twitter} className="text-decoration-none">
                                            <small className="text-muted d-block">Twitter</small>
                                        </a>
                                    </div>
                                </div>
                            )}
                            {state.user?.socialNetworkPlatform?.linkedln && (
                                <div className="d-flex align-items-center  text-start">
                                    <div className="bg-light p-2 rounded-circle me-3">
                                        <i className="fab fa-linkedin text-primary" />
                                    </div>
                                    <div>
                                        <a href={state.user?.socialNetworkPlatform?.linkedln} className="text-decoration-none">
                                            <small className="text-muted d-block">LinkedIn</small>
                                        </a>
                                    </div>
                                </div>
                            )}
                            {state.user?.socialNetworkPlatform?.yoursite && (
                                <div className="d-flex align-items-center">
                                    <div className="bg-light p-2 rounded-circle me-3">
                                        <i className="fas fa-globe text-success" />
                                    </div>
                                    <div>
                                        <a href={state.user.socialNetworkPlatform?.yoursite} className="text-decoration-none">
                                            <small className="text-muted d-block">Website</small>

                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Stats Cards */}
                    <div className="row g-3">
                        <div className="col-6 col-sm-6">
                            <div className="card stats-card text-center p-3">
                                <h3 className="mb-1 fw-bold text-primary">0</h3>
                                <small className="text-muted">Tổng số bài viết</small>
                            </div>
                        </div>
                        <div className="col-6 col-sm-6">
                            <div className="card stats-card text-center p-3">
                                <h3 className="mb-1 fw-bold text-success">2</h3>
                                <small className="text-muted">Đang theo dõi</small>
                            </div>
                        </div>
                        <div className="col-6 col-sm-6">
                            <div className="card stats-card text-center p-3">
                                <h3 className="mb-1 fw-bold text-info">1</h3>
                                <small className="text-muted">Người theo dõi</small>
                            </div>
                        </div>
                        <div className="col-6 col-sm-6">
                            <div className="card stats-card text-center p-3">
                                <h3 className="mb-1 fw-bold text-danger">0</h3>
                                <small className="text-muted">Tổng bình luận</small>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right Column - Content */}
                <div className="col-lg-8">
                    {/* Navigation Tabs */}
                    <ul className="nav nav-pills mb-4 justify-content-center justify-content-md-start">
                        {NAV.map((navLink: any) => {
                            return (
                                <li className="nav-item">
                                    <Link className={`nav-link ${navLink.path === useNav ? "active-profile" : ""}`} onClick={() => {
                                        setUseNav(navLink.path)
                                    }} to={navLink.path}>
                                        <i className={`${navLink.icon} me-1`}/> {navLink.name}
                                    </Link>
                                </li>
                            )
                        })}

                    </ul>
                    {/* Content Area */}
                    <div className="content-area">
                        <Outlet />
                        {/* <div className="text-center py-5">
                            <img
                                src="/api/placeholder/200/150"
                                alt="Empty state"
                                className="mb-3 opacity-50"
                            />
                            <h5 className="text-muted">Chưa có bài viết nào</h5>
                            <p className="text-muted mb-4">
                                Hãy bắt đầu chia sẻ kiến thức của bạn
                            </p>
                            <button className="btn btn-primary px-4">
                                <i className="fas fa-plus me-2" />
                                Tạo bài viết mới
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>

    </>)
}