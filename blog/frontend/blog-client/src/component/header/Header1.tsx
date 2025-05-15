import { useState } from "react";
import { Link } from "react-router-dom";
import { getRefreshToken, getToken, getUserLoggined } from "../../service/AuthenLoginResponse";
import NotificationDropdown from "../notification/NotificationDropdown";
import "./Header.css"
export default function Header1() {
    const [useNav, setUseNav] = useState<"POST" | "SERIES" | "FOLLOWING" | "BOOKMARK">("POST")
    const [query, setQuery] = useState("")

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container">
                <Link className="navbar-brand" to={"/"} onClick={() => setUseNav("POST")}>VIOSMASH</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <ul className="nav nav-tabs">
                            {!getUserLoggined() ? "" : <li className={"nav-item"}><Link className={useNav == 'POST' ? "nav-link text-dark active text-bold" : "nav-link text-dark"} to={`/newest`} onClick={() => setUseNav("POST")}>Bài viết</Link></li>}
                            {!getUserLoggined() ? "" : <li className={"nav-item"}><Link className={useNav == 'FOLLOWING' ? "nav-link text-dark active text-bold" : "nav-link text-dark"} to={`my-followings`} onClick={() => setUseNav("FOLLOWING")}>Đang theo dõi</Link></li>}
                            {!getUserLoggined() ? "" : <li className={"nav-item"}><Link className={useNav == 'BOOKMARK' ? "nav-link text-dark active text-bold" : "nav-link text-dark"} to={"my-bookmarks"} onClick={() => setUseNav("BOOKMARK")}>Bookmark của tôi</Link></li>}
                            {!getUserLoggined() ? "" : <li className={"nav-item"}><Link className={useNav == 'SERIES' ? "nav-link text-dark active text-bold" : "nav-link text-dark"} to={"series"} onClick={() => setUseNav("SERIES")}>Series</Link></li>}
                        </ul>
                    </ul>
                    <form className="d-flex me-3">
                        <div className="input-group">
                            {/* <div className="d-flex">
                                <input className="form-control me-2" type="search" onChange={(e: any) => setQuery(e.target.value)} name="q" placeholder="Tìm kiếm bài viết" />
                                <Link to={`/search?q=${query}`} state={{ q: query }} className="btn btn-outline-primary"  >🔍</Link>
                            </div> */}
                            <input className="form-control" type="search" placeholder="Tìm kiếm bài viết" onChange={(e: any) => setQuery(e.target.value)} name="q" />
                            <Link to={`/search?q=${query}`} state={{ q: query }} className="btn btn-outline-primary"  ><i className="fas fa-search"></i></Link>

                        </div>
                    </form>
                    <div className="d-flex align-items-center">

                        {getRefreshToken() && (
                            <NotificationDropdown />
                        )}
                        {/* <button className="btn btn-outline-secondary position-relative me-3">
                            <i className="fas fa-bell"></i>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                6+
                            </span>
                        </button> */}
                        {getToken() && (
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                     {getUserLoggined()?.fullName}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><Link className="dropdown-item" to={`/profile/${getUserLoggined()._id}`}>Thông tin cá nhân</Link></li>
                                    <li><a className="dropdown-item" href="#">Cài đặt</a></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><a className="dropdown-item" href="#">Đăng xuất</a></li>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}