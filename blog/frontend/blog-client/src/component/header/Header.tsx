
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form, Link } from "react-router-dom"
import { countUnreadNotifyMessageAction, fetchNotifyMessageAction } from "../../redux/store/action/notifyMessage/notify.message.acction"
import { getRefreshToken, getToken, getUserLoggined } from "../../service/AuthenLoginResponse"
import ThemeToggle from "../common/theme/ThemeToggle"
import Notification from "../notification/Notification"
import NotificationDropdown from "../notification/NotificationDropdown"
import "./Header.css"
function Header() {
    const [query, setQuery] = useState("")
    return (

        <>
        <div>
            <ThemeToggle/>
        </div>
        <nav className="navbar navbar-expand-lg   px-4">
            <a className="navbar-brand" href="/">VIOSMASH</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <div className="d-flex">
                        <input className="form-control me-2" type="search" onChange={(e: any) => setQuery(e.target.value)} name="q" placeholder="Tìm kiếm bài viết" />
                        <Link to={`/search?q=${query}`} state={{q: query}} className="btn btn-outline-primary"  >🔍</Link>
                    </div>
                </ul>

                {getRefreshToken() && (
                    <NotificationDropdown />
                )}
                {!getToken() && (
                    <a href={`/login?continue=${location.href}`} className="btn btn-outline-secondary ms-3">Đăng nhập/Đăng ký</a>

                )}
                {getToken() && (
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="bi bi-person-circle"></i> {getUserLoggined()?.fullName}
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
        </nav>
        </>
    )
}
export default Header