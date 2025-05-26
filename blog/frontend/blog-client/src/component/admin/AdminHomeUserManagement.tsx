import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { getUserLoggined } from "../../service/AuthenLoginResponse";
import { showConfirm } from "../common/ConfirmDialog";
import ModalComponent from "../common/modal/ModalComponent";
import UserForm from "./UserForm";

export default function AdminHomeUserManagement() {
    const [openModalNewUser, setOpeModalNewUser] = useState(false)
    const [openModalEditUser, setOpeModalEditUser] = useState(false)
    return (
        <>
            {/* modal add new user */}
            <ModalComponent 
                show={openModalNewUser}
                onClose={() => setOpeModalNewUser(false)}
                title={"Thêm mới người dùng"}
                onSave = {() => {}}
            >
                <UserForm onChange={() => {}} userReq={{}} isUpdated={false}/>
            </ModalComponent>
             {/* modal edit  user */}
             <ModalComponent 
                show={openModalEditUser}
                onClose={() => setOpeModalEditUser(false)}
                title={"Cập nhật thông tin"}
                onSave = {() => {}}
            >
                <UserForm onChange={() => {}} userReq={{}} isUpdated={true}/>
            </ModalComponent>
            <div
                id="users-section"
                className="content-section"
            >
                <div className="row">
                    <div className="col-12">
                        <div className="">
                            <div className="card-header-admin mb-3">
                                <div className="row align-items-center">
                                    <div className="col-md-6">
                                        <h5 className="mb-0">
                                            <i className="fas fa-users me-2" />
                                            Thông tin người dùng
                                        </h5>
                                    </div>
                                    <div className="col-md-6 text-end">
                                        <button className="btn btn-primary" onClick={() => {setOpeModalNewUser(true)}}>
                                            <i className="fas fa-plus me-2" />
                                            Thêm người dùng
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body ">
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="search-box">
                                            <i className="fas fa-search" />
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search users..."
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 text-end">
                                        <select
                                            className="form-select d-inline-block"
                                            style={{ width: "auto" }}
                                        >
                                            <option>Tất cả vài trò</option>
                                            <option value={"ADMIN"}>Quản trị viên</option>
                                            <option value={"USER"}>Người dùng</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Ảnh</th>
                                                        <th>Họ tên</th>
                                                        <th>Email</th>
                                                        <th>Vai trò</th>
                                                        <th>Trạng thái</th>
                                                        <th>Tham gia</th>
                                                        <th>Hành động</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>#001</td>
                                                        <td>
                                                            <div
                                                                className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white"
                                                                style={{ width: 40, height: 40 }}
                                                            >
                                                                JD
                                                            </div>
                                                        </td>
                                                        <td>John Doe</td>
                                                        <td>john@example.com</td>
                                                        <td>
                                                            <span className="badge bg-primary">Quản trị viên</span>
                                                        </td>
                                                        <td>
                                                            <span className="badge bg-success">Đang hoạt động</span>
                                                        </td>
                                                        <td>2024-01-15</td>
                                                        <td>
                                                            <button className="btn btn-sm btn-outline-primary me-1">
                                                                <i className="fas fa-edit" />
                                                            </button>
                                                            <button className="btn btn-sm btn-outline-danger">
                                                                <i className="fas fa-trash" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>#002</td>
                                                        <td>
                                                            <div
                                                                className="bg-success rounded-circle d-flex align-items-center justify-content-center text-white"
                                                                style={{ width: 40, height: 40 }}
                                                            >
                                                                JS
                                                            </div>
                                                        </td>
                                                        <td>Jane Smith</td>
                                                        <td>jane@example.com</td>
                                                        <td>
                                                            <span className="badge bg-secondary">Người dùng</span>
                                                        </td>
                                                        <td>
                                                            <span className="badge bg-success">Đang hoạt động</span>
                                                        </td>
                                                        <td>2024-01-20</td>
                                                        <td>
                                                            <button className="btn btn-sm btn-outline-primary me-1" onClick={() => {
                                                                setOpeModalEditUser(true)
                                                            }}>
                                                                <i className="fas fa-edit" />
                                                            </button>
                                                            <button className="btn btn-sm btn-outline-danger" onClick={() => {
                                                                showConfirm("Xóa người dùng" , `Khi xóa người dùng với Id: ${getUserLoggined()._id} thì mọi tương tác như bài viết, bình luận sẽ bị xóa hết.`, () => {

                                                                })
                                                            }}>
                                                                <i className="fas fa-trash" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>#003</td>
                                                        <td>
                                                            <div
                                                                className="bg-warning rounded-circle d-flex align-items-center justify-content-center text-white"
                                                                style={{ width: 40, height: 40 }}
                                                            >
                                                                MB
                                                            </div>
                                                        </td>
                                                        <td>Mike Brown</td>
                                                        <td>mike@example.com</td>
                                                        <td>
                                                            <span className="badge bg-secondary">Người dùng</span>
                                                        </td>
                                                        <td>
                                                            <span className="badge bg-danger">
                                                                Đã bị khóa
                                                            </span>
                                                        </td>
                                                        <td>2024-02-01</td>
                                                        <td>
                                                            <button className="btn btn-sm btn-outline-primary me-1">
                                                                <i className="fas fa-edit" />
                                                            </button>
                                                            <button className="btn btn-sm btn-outline-danger">
                                                                <i className="fas fa-trash" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>#004</td>
                                                        <td>
                                                            <div
                                                                className="bg-info rounded-circle d-flex align-items-center justify-content-center text-white"
                                                                style={{ width: 40, height: 40 }}
                                                            >
                                                                SD
                                                            </div>
                                                        </td>
                                                        <td>Sarah Davis</td>
                                                        <td>sarah@example.com</td>
                                                        <td>
                                                            <span className="badge bg-secondary">Người dùng</span>
                                                        </td>
                                                        <td>
                                                            <span className="badge bg-success">Đang hoạt động</span>
                                                        </td>
                                                        <td>2024-02-10</td>
                                                        <td>
                                                            <button className="btn btn-sm btn-outline-primary me-1">
                                                                <i className="fas fa-edit" />
                                                            </button>
                                                            <button className="btn btn-sm btn-outline-danger">
                                                                <i className="fas fa-trash" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>#005</td>
                                                        <td>
                                                            <div
                                                                className="bg-danger rounded-circle d-flex align-items-center justify-content-center text-white"
                                                                style={{ width: 40, height: 40 }}
                                                            >
                                                                TW
                                                            </div>
                                                        </td>
                                                        <td>Tom Wilson</td>
                                                        <td>tom@example.com</td>
                                                        <td>
                                                            <span className="badge bg-secondary">Người dùng</span>
                                                        </td>
                                                        <td>
                                                            <span className="badge bg-success">Đang hoạt động</span>
                                                        </td>
                                                        <td>2024-02-15</td>
                                                        <td>
                                                            <button className="btn btn-sm btn-outline-primary me-1">
                                                                <i className="fas fa-edit" />
                                                            </button>
                                                            <button className="btn btn-sm btn-outline-danger">
                                                                <i className="fas fa-trash" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}