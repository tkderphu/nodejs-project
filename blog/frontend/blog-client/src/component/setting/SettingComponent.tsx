import "./Setting.css"
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
                        <button
                            className="nav-link active"
                            id="notifications-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#notifications-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="notifications-tab-pane"
                            aria-selected="true"
                        >
                            <i className="bi bi-bell me-2" />
                            Thông báo
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="password-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#password-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="password-tab-pane"
                            aria-selected="false"
                        >
                            <i className="bi bi-shield-lock me-2" />
                            Mật khẩu
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="cash-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#cash-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="cash-tab-pane"
                            aria-selected="false"
                        >
                            <i className="bi bi-cash me-2"></i>
                            Giao dịch
                        </button>
                    </li>
                </ul>
                <div className="tab-content" id="settingsTabsContent">
                    {/* Notifications Tab */}
                    <div
                        className="tab-pane fade show active"
                        id="notifications-tab-pane"
                        role="tabpanel"
                        aria-labelledby="notifications-tab"
                        tabIndex={0}
                    >
                        <div className="alert-box bg-primary bg-opacity-10 text-primary">
                            <i className="bi bi-info-circle" />
                            <div>
                                <strong>Why manage notifications?</strong>
                                <p className="mb-0">
                                    Keep yourself updated with important activities while avoiding
                                    notification overload.
                                </p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h5 className="mb-3">Thông báo</h5>
                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                <div>
                                    <label className="form-check-label">
                                        Cho phép thông báo từ người đang theo dõi
                                    </label>
                                    <p className="text-muted small mb-0">
                                        Nhận được thông báo khi người mà bạn theo dõi đăng bài viết mới.
                                    </p>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="pushNotif"
                                    />
                                </div>
                            </div>
                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                <div>
                                    <label className="form-check-label">
                                        Cho phép thông báo khi tương tác bình luận
                                    </label>
                                    <p className="text-muted small mb-0">
                                        Nhận được thông báo người nào đó bình luận vào bài viết hoặc trả lời bình luận của bạn.
                                    </p>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="pushNotif"
                                    />
                                </div>
                            </div>
                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                <div>
                                    <label className="form-check-label">
                                        Cho phép thông báo khi thích bài viết,  bình luận
                                    </label>
                                    <p className="text-muted small mb-0">
                                        Nhận được thông báo người nào đó thích bình luận, bài viết.
                                    </p>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="pushNotif"
                                    />
                                </div>
                            </div>
                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                <div>
                                    <label className="form-check-label">
                                        Cho phép thông báo đẩy
                                    </label>
                                    <p className="text-muted small mb-0">
                                        Nhận được thông báo ngay cả khi bạn không sử dụng ứng dụng.
                                    </p>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="pushNotif"
                                    />
                                </div>
                            </div>
                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                <div>
                                    <label className="form-check-label">Âm thanh thông báo</label>
                                    <p className="text-muted small mb-0">
                                        Bật tiếng khi có thông báo đến
                                    </p>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="soundNotif"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                            <button type="button" className="btn btn-outline-secondary me-2">
                                Hủy
                            </button>
                            <button type="button" className="btn btn-primary">
                                Lưu
                            </button>
                        </div>
                    </div>
                    {/* Password Tab */}
                    <div
                        className="tab-pane fade"
                        id="password-tab-pane"
                        role="tabpanel"
                        aria-labelledby="password-tab"
                        tabIndex={0}
                    >
                        <div className="alert-box bg-warning bg-opacity-10 text-warning">
                            <i className="bi bi-shield-exclamation" />
                            <div>
                                <strong>Keep your account secure!</strong>
                                <p className="mb-0">
                                    Use a strong, unique password that you don't use for other
                                    services.
                                </p>
                            </div>
                        </div>
                        <form id="passwordForm">
                            <div className="mb-3">
                                <label htmlFor="currentPassword" className="form-label">
                                    Mật khẩu hiện tại
                                </label>
                                <div className="position-relative">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="currentPassword"
                                        required
                                    />
                                    <span
                                        className="toggle-password"

                                    >
                                        <i className="bi bi-eye" />
                                    </span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="newPassword" className="form-label">
                                    Mật khẩu mới
                                </label>
                                <div className="position-relative">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="newPassword"
                                        required
                                    />
                                    <span
                                        className="toggle-password"

                                    >
                                        <i className="bi bi-eye" />
                                    </span>
                                </div>
                                <div className="password-strength mt-2">
                                    <div className="password-strength-meter" />
                                </div>
                                <div className="d-flex justify-content-between mt-1">
                                    <small className="text-muted">Password strength</small>
                                    <small className="text-success">Strong</small>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Nhập lại mật khẩu mới
                                </label>
                                <div className="position-relative">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        required
                                    />
                                    <span
                                        className="toggle-password"

                                    >
                                        <i className="bi bi-eye" />
                                    </span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <p className="mb-2">Yêu cầu mật khẩu:</p>
                                <ul className="list-unstyled">
                                    <li className="small text-success mb-1">
                                        <i className="bi bi-check-circle me-2" />
                                        At least 8 characters
                                    </li>
                                    <li className="small text-success mb-1">
                                        <i className="bi bi-check-circle me-2" />
                                        At least one uppercase letter
                                    </li>
                                    <li className="small text-success mb-1">
                                        <i className="bi bi-check-circle me-2" />
                                        At least one lowercase letter
                                    </li>
                                    <li className="small text-success mb-1">
                                        <i className="bi bi-check-circle me-2" />
                                        At least one number
                                    </li>
                                    <li className="small text-secondary mb-1">
                                        <i className="bi bi-circle me-2" />
                                        At least one special character
                                    </li>
                                </ul>
                            </div>
                            {/* <div className="form-check mb-4">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="logoutDevices"
                                />
                                <label className="form-check-label" htmlFor="logoutDevices">
                                    Log out from all other devices
                                </label>
                                <div className="form-text">
                                    This will sign you out from all other sessions across all your
                                    devices.
                                </div>
                            </div> */}
                            <div className="d-flex justify-content-end">

                                <button type="submit" className="btn btn-primary">
                                    Lưu thay đổi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}