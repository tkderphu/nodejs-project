import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { authLoginAction } from "../../redux/store/action/auth/auth.action";
import { fetchProfileAction, updatePasswordAction } from "../../redux/store/action/profile/profile.action";
import profileService from "../../service/profile.service";
import FullScreenLoader from "../common/fullspinner/FullScreenLoader";
import PasswordValidator from "../common/PasswordValidator";

export default function SettingPassword() {
    const [req, setReq] = useState({
        oldPassword: "",
        newPassword: ""
    })
    const [err, setErr] = useState(false)
    const onChangePassword = (e: any) => {
        const { name, value } = e.target
        setReq((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const dispatch = useDispatch()
    const { loading, message, success } = useSelector((state: any) => {
        return state.updatePassword
    })
    const onSubmit = () => {
        //@ts-ignore
        dispatch(updatePasswordAction(req))
    }


    useEffect(() => {
        if (success) {
            setReq({newPassword: "", oldPassword: ""})
            toast.success("Đổi mật khẩu thành công")
        }
        if (message) {
            toast.error(message)
        }
    }, [loading && message && success])


    return (
        <>
            {loading && <FullScreenLoader />}
            {/* Password Tab */}
            <div
                className=""
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
                <div>
                    <div className="mb-3">
                        <label htmlFor="currentPassword" className="form-label">
                            Mật khẩu hiện tại
                        </label>
                        <div className="position-relative">
                            <input
                                type="password"
                                className="form-control"
                                id="currentPassword"
                                name='oldPassword'
                                value={req.oldPassword}
                                onChange={onChangePassword}
                                required
                            />
                            <span
                                className="toggle-password"

                            >
                                {/* <i className="bi bi-eye" /> */}
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
                                value={req.newPassword}
                                name="newPassword"
                                onChange={onChangePassword}
                                required
                            />
                            <span
                                className="toggle-password"

                            >
                                {/* <i className="bi bi-eye" /> */}
                            </span>
                        </div>
                        {/* <div className="password-strength mt-2">
                            <div className="password-strength-meter" />
                        </div> */}
                        {/* <div className="d-flex justify-content-between mt-1">
                            <small className="text-muted">Password strength</small>
                            <small className="text-success">Strong</small>
                        </div> */}
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
                                
                                onChange={(e: any) => {
                                    const value = e.target.value
                                    if (value == req.newPassword) {
                                        setErr(false)
                                    } else {
                                        setErr(true)
                                    }
                                }}
                                required
                            />
                            <span
                                className="toggle-password"

                            >
                                {/* <i className="bi bi-eye" /> */}
                            </span>
                            {err && (
                                <div className="d-flex justify-content-between mt-1">
                                    <small className="color-red" style={{ color: "red" }}>Mật khẩu không khớp</small>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mb-4">
                        <PasswordValidator password={req.newPassword} />
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

                        <button onClick={onSubmit} className="btn btn-primary">
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}