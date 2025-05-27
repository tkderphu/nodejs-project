import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchListReportAction } from "../../redux/store/action/report/report.action"
import { ReportResp } from "../../service/report.service"
import { formatDate } from "../../utils/utils"
import { showConfirm } from "../common/ConfirmDialog"

export default function AdminHomeReportComment() {
    const fetchListReportState: {
        loading: boolean,
        reports: ReportResp[]
    } = useSelector((state: any) => {
        return state.fetchListReport
    })
    const [filter, setFilter] = useState<"ALL" | "PENDING" | "RESOLVED">("ALL")
    const dispatch = useDispatch()
    useEffect(() => {
        if (filter === 'ALL') {
            //@ts-ignore
            dispatch(fetchListReportAction("COMMENT"))
        } else {
            //@ts-ignore
            dispatch(fetchListReportAction("COMMENT", filter))
        }
    }, [filter])
    console.log("report list: ", fetchListReportState.reports)
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
                                Bình luận bị tố cáo
                            </h5>
                        </div>
                        <div className="col-md-6 text-end">
                            <div className="btn-group">

                                <select className="form-select" onChange={(e: any) => {
                                    setFilter(e.target.value)
                                }} aria-label="Default select example">
                                    <option value={"ALL"} selected>Tất cả</option>
                                    <option value="PENDING">Chờ phê duyệt</option>
                                    <option value="RESOLVED">Đã giải quyết</option>
                                </select>
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
                                        <tr className="">
                                            <th>Id</th>
                                            <th>Nội dung</th>
                                            <th>Tác giả</th>
                                            <th>Tố cáo bởi</th>
                                            <th>Lý do</th>
                                            <th>Ngày</th>
                                            <th>Trạng thái</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fetchListReportState.reports?.map(report => {
                                            return (
                                                <tr >
                                                    <td>{report._id}</td>
                                                    <td><Link to={"/posts/" + report.post?._id} className="text-decoration-none">{report.comment?.content || "null"}</Link></td>
                                                    <td><Link to={"/profile/" + report.comment?.user?._id} className="text-decoration-none">{report.comment?.user?.fullName}</Link></td>
                                                    <td><Link to={"/profile/" + report.user?._id} className="text-decoration-none">{report?.user?.fullName}</Link></td>
                                                    <td>
                                                        <span style={{ color: "red" }}>
                                                            {report.reason}
                                                        </span>
                                                    </td>
                                                    <td>{formatDate(report.createdAt)}</td>
                                                    <td>
                                                        <span className="badge bg-warning">
                                                            {report.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-1 mb-2" onClick={() => {
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
                                            )
                                        })}
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