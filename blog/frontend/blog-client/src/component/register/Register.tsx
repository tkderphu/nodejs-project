import { Link } from "react-router-dom"
import {useState} from 'react'
import {useDispatch} from 'react-redux'
function Register() {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')



    // const {loading, hasError, error, message} = useSelector((state: any) => {
    //     return {
    //         loading: state.authLogin.loading,
    //         hasError: state.authLogin.hasError,
    //         error: state.authLogin.error,
    //         message: state.authLogin.message
    //     }
    // })
    // const dispatch = useDispatch()

    const registerSubmit = () => {
        //@ts-ignore
        // dispatch(authRegisterAction({
        //     email, password, fullName
        // }))
    }

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
            <div className="card p-4 shadow" style={{ width: "350px" }}>
                <h3 className="text-center mb-3">Đăng ký</h3>
                <form>
            <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Họ và Tên</label>
                <input type="text" className="form-control" id="fullName" onChange={(e) => setFullName(e.target.value)} placeholder="Nhập họ và tên của bạn" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Nhập email của bạn" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Mật khẩu</label>
                <input type="password" className="form-control" onChange={(e: any) => setPassword(e.target.value)} id="password" placeholder="Nhập mật khẩu" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Mật lại khẩu</label>
                <input type="password" className="form-control" onChange={(e) => {
                    if(e.target.value !== password) {
                        setErrorMessage('Mật khẩu không khớp')
                    } else {
                        setErrorMessage('')
                    }
                }} id="password" placeholder="Nhập mật khẩu" required/>
            </div>
            <div className="text-danger">{errorMessage}</div>
            <button type="submit" className="btn btn-primary w-100 mt-3" onClick={() => {
                registerSubmit()
            }}>Đăng Ký</button>
        </form>
                <div className="text-center mt-3">
                    <p>Đã có tài khoản? <Link to={'/login'} className="text-decoration-none">Đăng nhập ngay</Link></p>
                </div>
            </div>
        </div>
    )
}
export default Register