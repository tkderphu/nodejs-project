import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import authService from "../../service/auth.service"
import { authLoginAction } from "../../redux/store/action/auth/auth.action"
function Login() {
    const { loading, hasError, error, message } = useSelector((state: any) => {
        return {
            loading: state.authLogin.loading,
            hasError: state.authLogin.hasError,
            error: state.authLogin.error,
            message: state.authLogin.message
        }
    })
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitLogin = () => {
        //@ts-ignore
        dispatch(authLoginAction(email, password))

    }

    console.log("loading: ", loading)


    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
            <div className="card p-4 shadow" style={{ width: "350px" }}>
                <h3 className="text-center mb-3">Đăng Nhập</h3>
                {hasError && <div className="alert alert-danger" role="alert">
                   {message}
                </div>}
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control"
                            onChange={(e: any) => setEmail(e.target.value)}
                            id="email" placeholder="Nhập email của bạn" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mật khẩu</label>
                        <input type="password" className="form-control"
                            onChange={(e: any) => setPassword(e.target.value)}
                            id="password" placeholder="Nhập mật khẩu" required />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">

                        <Link to={'/forgot-password'} className="text-decoration-none">Quên mật khẩu?</Link>
                    </div>
                    <div>
                    {loading && <div className="spinner-border" role="status"/>}
                    </div>
                    <button type="button" className="btn btn-primary w-100 mt-3" onClick={() => {
                        submitLogin()
                    }}>Đăng Nhập</button>
                </form>
                <div className="text-center mt-3">
                    <p>Chưa có tài khoản? <Link to={'/register'} className="text-decoration-none">Đăng ký ngay</Link></p>
                </div>
            </div>
        </div>
    )
}
export default Login