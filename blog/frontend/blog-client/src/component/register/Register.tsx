import { Link } from "react-router-dom"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authRegisterAction } from "../../redux/store/action/auth/auth.action"
function Register() {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')



    const { loading, hasError, error, message } = useSelector((state: any) => {
        return state.authRegister
    })
    const dispatch = useDispatch()

    const registerSubmit = () => {
        //@ts-ignore
        dispatch(authRegisterAction({
            email, password, fullName
        }))
    }

    return (
        <div className="text-start d-flex align-items-center justify-content-center" style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
            <div className="card p-4 shadow" style={{ width: "350px" }}>
                <h3 className="text-center mb-1">Đăng ký</h3>

                {hasError && (<div className="alert alert-danger">
                    {message}
                </div>)}
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Họ và Tên</label>
                    <input type="text" className="form-control" id="fullName" onChange={(e) => setFullName(e.target.value)} placeholder="Nhập họ và tên của bạn" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Nhập email của bạn" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                    <input type="password" className="form-control" onChange={(e: any) => setPassword(e.target.value)} id="password" placeholder="Nhập mật khẩu" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mật lại khẩu</label>
                    <input type="password" className="form-control" onChange={(e) => {
                        if (e.target.value !== password) {
                            setErrorMessage('Mật khẩu không khớp')
                        } else {
                            setErrorMessage('')
                        }
                    }} id="password" placeholder="Nhập mật khẩu" required />
                </div>
                <div className="text-danger">{errorMessage}</div>

                <div className="d-flex justify-content-center">
                {loading && <div className="spinner-border" role="status">
                </div>}
                </div>
                <button className="btn btn-primary w-100 mt-3" onClick={() => {
                    registerSubmit()
                }}>Đăng Ký</button>

                <div className="text-center mt-3">
                    <p>Đã có tài khoản? <Link to={'/login'} className="text-decoration-none">Đăng nhập ngay</Link></p>
                </div>
            </div>
        </div>
    )
}
export default Register