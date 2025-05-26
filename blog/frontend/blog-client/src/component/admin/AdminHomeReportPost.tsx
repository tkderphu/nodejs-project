import { showConfirm } from "../common/ConfirmDialog"

export default function AdminHomeReportPost() {
    return (
        <div
            className="tab-pane fade show active"
            id="posts"
            role="tabpanel">
            <div className="">
                <div className="card-header-admin">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h5 className="mb-0">
                                <i className="fas fa-file-alt me-2" />
                                Bài viết bị tố cáo
                            </h5>
                        </div>
                        <div className="col-md-6 text-end">
                            <div className="btn-group">
                                <button
                                    className="btn btn-light btn-sm dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                >
                                    Lọc trạng thái
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            All
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Pending
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Resolved
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-12">
                            <div className="table-responsive" >
                                <table className="table table-hover">
                                    <thead className="text-start">
                                        <tr >
                                            <th>Id</th>
                                            <th>Tiêu đề bài viết</th>
                                            <th>Tác giả</th>
                                            <th>Tố cáo bởi</th>
                                            <th>Lý do</th>
                                            <th>Ngày</th>
                                            <th>Trạng thái</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <td>2-23932fnwl</td>
                                            <td>Inappropriate Content Post</td>
                                            <td>User123</td>
                                            <td>Reporter1</td>
                                            <td>
                                                <span className="badge bg-danger">
                                                    Spam
                                                </span>
                                            </td>
                                            <td>2024-05-20</td>
                                            <td>
                                                <span className="badge bg-warning">
                                                    Pending
                                                </span>
                                            </td>
                                            <td>
                                                <button className="btn btn-sm btn-success me-1 mb-2" onClick={()=> {
                                                    showConfirm("Đồng ý với tố cáo", "Bạn sẽ xóa cái bài viết này", () => {
                                                        
                                                    })
                                                }}>
                                                    <i className="fas fa-check" /> Chấp nhận
                                                </button>
                                                <button className="btn btn-sm btn-danger mb-2">
                                                    <i className="fas fa-times" /> Từ chối
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
    )
}