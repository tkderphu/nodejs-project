
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { countUnreadNotifyMessageAction, fetchNotifyMessageAction } from "../../redux/store/action/notifyMessage/notify.message.acction"
import { getRefreshToken, getToken, getUserLoggined } from "../../service/AuthenLoginResponse"
import "./Header.css"
function Header() {
    const { count } = useSelector((state: any) => {
        return state.countUnreadNotifyMessage
    })
    const notifyMessageState: {
        messages: {
            _id: string,
            createdAt: any,
            content: string,
            userMessages: {
                read: boolean
            }[]
        }[],
        loading: boolean,
        hasError: boolean
    } = useSelector((state: any) => {
        return state.fetchAllNotifyMessage
    })
    const dispatch = useDispatch()
    useEffect(() => {
        //@ts-ignore
        dispatch(countUnreadNotifyMessageAction())
        //@ts-ignore
        dispatch(fetchNotifyMessageAction())
    }, [])
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
            <a className="navbar-brand" href="/">VIOSMASH</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search posts" />
                        <button className="btn btn-outline-primary" type="submit">🔍</button>
                    </form>
                </ul>

                {getRefreshToken() && (
                    <div className="dropdown me-3 mx-5">
                        <button className="btn btn-outline-primary position-relative" type="button" id="notificationDropdown"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                            </svg>
                            {(count != 0) && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {count}+
                                </span>
                            )}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end notifications" aria-labelledby="notificationDropdown">
                            {notifyMessageState.messages && notifyMessageState.messages.length > 0 ? (
                                <>
                                    {notifyMessageState.messages.map((val, index) => {
                                        if (index <= 5) {
                                            return (
                                                <div className="dropdown-item" dangerouslySetInnerHTML={{ __html: val.content }} />
                                            )
                                        }
                                        return <></>
                                    })}

                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><a className="dropdown-item text-center text-primary" href="#">View all</a></li>
                                </>
                            ) : (<h4 className="text-center">Bạn không có thông báo</h4>)}
                        </ul>
                    </div>
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