import { Link, Outlet } from "react-router-dom"
import "./Setting.css"
import SettingNotifyComponent from "./SettingNotifyComponent"
import SettingPassword from "./SettingPasword"
export default function SettingComponent() {
    return (
        <div className="container-fluid text-start">
            <div className="settings-header text-white">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h1 className="mb-0">Quản lý tài khoản</h1>
                        <p className="mb-0 mt-1 opacity-75">
                            Quản lý tài khoản của bạn và sở thích
                        </p>
                    </div>
                    <div className="avatar-section">
                        <div className="avatar bg-white text-primary">
                            <i className="bi bi-person-fill" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="settings-body">
                <ul className="nav nav-tabs" id="settingsTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                        <Link
                            to={"notification"}
                            className="nav-link active"
                            id="notifications-tab"
                            // data-bs-toggle="tab"
                            // data-bs-target="#notifications-tab-pane"
                            // aria-controls="notifications-tab-pane"
                            // aria-selected="true"
                        >
                            <i className="bi bi-bell me-2" />
                            Thông báo
                        </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link
                            to={"password"}
                            className="nav-link"
                            id="password-tab"
                            // data-bs-toggle="tab"
                            // data-bs-target="#password-tab-pane"
                            // type="button"
                            // role="tab"
                            // aria-controls="password-tab-pane"
                            // aria-selected="false"
                        >
                            <i className="bi bi-shield-lock me-2" />
                            Mật khẩu
                        </Link>
                    </li>

                </ul>
                <div className="tab-content" id="settingsTabsContent">
                    <Outlet />
                </div>
            </div>
        </div>

    )
}