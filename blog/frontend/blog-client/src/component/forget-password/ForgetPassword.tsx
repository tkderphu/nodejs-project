import { Link } from "react-router-dom"
import { useState } from 'react'
import { authForgetPasswordAction } from "../../redux/store/action/auth/auth.action"

function ForgetPassword() {


    const [email, setEmail] = useState('')


    // const {loading, hasError, error, message} = useSelector((state: any) => {
    //     return {
    //         loading: state.authForget.loading,
    //         hasError: state.authForget.hasError,
    //         error: state.authForget.error,
    //         message: state.authForget.message
    //     }
    // })
    // const dispatch = useDispatch()
    const forgetPasswordSubmit = () => {
        authForgetPasswordAction(email)
    }

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
            <div className="card p-4 shadow" style={{ width: "350px" }}>
                <h3 className="text-center mb-3">Quên mật khẩu</h3>
                <div className="alert alert-danger" role="alert">
                    This is a danger alert—check it out!
                </div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" onChange={(e) => {
                            setEmail(e.target.value)
                        }} className="form-control" id="email" placeholder="Nhập email của bạn" required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">Gửi yêu cầu</button>
                </form>
                <div className="text-center mt-3">
                    <p>Đã có tài khoản? <Link to={'/login'} className="text-decoration-none">Đăng nhập ngay</Link></p>
                </div>
            </div>
        </div>
    )
}
export default ForgetPassword