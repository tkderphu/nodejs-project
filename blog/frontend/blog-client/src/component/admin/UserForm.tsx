import { useState } from "react";
interface UserFormProps {
    userReq: any,
    onChange: any,
    isUpdated: boolean
}
export default function UserForm(props: UserFormProps) {

    return (
        // <div className="text-start d-flex align-items-center justify-content-center" style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
        <div >
            {/* {hasError && <div className="alert alert-danger" role="alert">
                    {message}
                </div>} */}
            <form>
                {!props.isUpdated && (
                    <>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Họ và tên</label>
                            <input type="email" className="form-control"
                                onChange={props.onChange}
                                name='email'
                                id="email" placeholder="Nhập họ và tên" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control"
                                onChange={props.onChange}
                                name='email'
                                id="email" placeholder="Nhập email" required />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="form-label">Mật khẩu</label>
                            <input type="password" className="form-control"
                                onChange={props.onChange}
                                name='password'
                                id="password" placeholder="Nhập mật khẩu" required />
                        </div>
                    </>
                )}
                <div className="mb-3 ">
                    <label htmlFor="role" className="form-label">Vai trò</label>
                    <select
                        className="form-select d-inline-block"
                        id="role"

                    >
                        <option value={"ADMIN"}>Quản trị viên</option>
                        <option value={"USER"} selected>Người dùng</option>
                    </select>
                </div>
                {props.isUpdated && (
                    <div className="mb-3 ">
                        <label htmlFor="role" className="form-label">Trạng thái người dùng</label>
                        <select
                            className="form-select d-inline-block"
                            id="role"

                        >
                            <option value={"active"}>Hoạt động</option>
                            <option value={"block"} selected>Khóa</option>
                        </select>
                    </div>
                )}
            </form>

        </div>
        // </div>
    )
}