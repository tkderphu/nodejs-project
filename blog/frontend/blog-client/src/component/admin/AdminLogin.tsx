import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import authService from "../../service/auth.service"
import { toast } from 'react-toastify';

import { authLoginAction } from "../../redux/store/action/auth/auth.action"
import ReCAPTCHA from "react-google-recaptcha"
export default function AdminLogin() {
    const { loading, hasError, error, message } = useSelector((state: any) => {
        return {
            loading: state.authLogin.loading,
            hasError: state.authLogin.hasError,
            error: state.authLogin.error,
            message: state.authLogin.message
        }
    })
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({ email: '', password: '', captcha: '' });

    const submitLogin = () => {
        if (formData.captcha == null || formData.captcha.length == 0) {
            console.log('ccc')
            toast.error('Bạn cần xác thực CAPTCHA');
            return;
        }
        console.log(formData)
        //@ts-ignore
        dispatch(authLoginAction(formData))

    }

    const onChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const onCaptchaChange = (value: any) => {
        setFormData({ ...formData, captcha: value });
    };


    return (
        <div className="text-start d-flex align-items-center justify-content-center" style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
            <div className="card p-4 shadow" style={{ width: "350px" }}>
                <h3 className="text-center mb-3">Đăng Nhập</h3>
                {hasError && <div className="alert alert-danger" role="alert">
                    {message}
                </div>}
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control"
                            onChange={onChange}
                            name='email'
                            id="email" placeholder="Nhập email của bạn" required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="form-label">Mật khẩu</label>
                        <input type="password" className="form-control"
                            onChange={onChange}
                            name='password'
                            id="password" placeholder="Nhập mật khẩu" required />
                    </div>

                    <div className="captcha-container mb-2">
                        <ReCAPTCHA
                            sitekey={import.meta.env.VITE_APP_CAPTCHA_SITE_KEY || ""}
                            onChange={onCaptchaChange}
                        />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">

                        <Link to={'/forgot-password'} className="text-decoration-none">Quên mật khẩu?</Link>
                    </div>
                    <div>
                        {loading && <div className="spinner-border" role="status" />}
                    </div>
                    <button type="button" className="btn btn-primary w-100 mt-3" onClick={() => {
                        submitLogin()
                    }}>Đăng Nhập</button>
                </form>
                
            </div>
        </div>
    )
}
