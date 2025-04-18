
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form, Link } from "react-router-dom"
import { countUnreadNotifyMessageAction, fetchNotifyMessageAction } from "../../redux/store/action/notifyMessage/notify.message.acction"
import { getRefreshToken, getToken, getUserLoggined } from "../../service/AuthenLoginResponse"
import Notification from "../notification/Notification"
import NotificationDropdown from "../notification/NotificationDropdown"
import "./Header.css"
function Header() {
    const [query, setQuery] = useState("")
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
            <a className="navbar-brand" href="/">VIOSMASH</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <div className="d-flex">
                        <input className="form-control me-2" type="search" onChange={(e: any) => setQuery(e.target.value)} name="q" placeholder="Tìm kiếm bài viết" />
                        <Link to={`/search?q=${query}`} className="btn btn-outline-primary"  >🔍</Link>
                    </div>
                </ul>

                {getRefreshToken() && (
                    <NotificationDropdown/>
                )}
                {!getToken() && (
                    <a href={`/login?continue=${location.href}`} className="btn btn-outline-secondary ms-3">Đăng nhập/Đăng ký</a>

                )}
                {getToken() && (<div className="dropdown">
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="userDropdown"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-person-circle"></i> {getUserLoggined()?.fullName}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <li><a className="dropdown-item" href={`/profile/${getUserLoggined()._id}`}>Thông tin cá nhân</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><a className="dropdown-item" href="#">Logout</a></li>
                    </ul>
                </div>)}
            </div>
        </nav>
    )
}
export default Header