import { useParams } from "react-router-dom"
import { getUserLoggined } from "../../service/AuthenLoginResponse"
import Modal from "../common/Modal"
import Post from "../post/PostSimple"
import "./Profile.css"
function Profile() {
    const {id} = useParams()
    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-8 col-md-7">
                        <div className="profile-header mb-3">
                            <img src="https://images.viblo.asia/avatar-retina/f8a57b4c-034c-4efd-971a-763c5b4ccee1.jpg" alt="User Avatar"/>
                                <div>
                                    <h4>phu quang</h4>
                                    <p className="text-muted">@quangphu</p>
                                </div>
                               {getUserLoggined()._id != id &&  <button className="btn btn-outline-primary edit-btn"  type="button">Theo doi</button>}
                                <button className="btn btn-outline-primary edit-btn"  type="button" data-toggle="modal" data-target='.profile-user'>Sửa</button>
                                <Modal dataTarget="profile-user"/>
                        </div>

                        <ul className="nav nav-tabs">
                            <li className="nav-item"><a className="nav-link active" href="#">Bài viết</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">Series</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">Bookmark</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">Đang theo dõi</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">Người theo dõi</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">Thẻ</a></li>
                        </ul>

                        <div className="content-box">
                            <Post/>
                            <Post/>
                            <Post/>
                            <Post/>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-5">
                        <div className="stats-box">
                            <button className="btn btn-light w-100 mb-2">Nhúng trang cá nhân</button>
                            <div className="stats-item"><span>Tổng số lượt xem bài viết</span> <strong>0</strong></div>
                            <div className="stats-item"><span>Các thẻ theo dõi</span> <strong>0</strong></div>
                            <div className="stats-item"><span>Đang theo dõi các người dùng</span> <strong>1</strong></div>
                            <div className="stats-item"><span>Các người dùng đang theo dõi</span> <strong>0</strong></div>
                            <div className="stats-item"><span>Bài viết</span> <strong>0</strong></div>
                            <div className="stats-item"><span>Bookmark</span> <strong>0</strong></div>
                            <div className="stats-item"><span>Tổng số binh luan</span> <strong>0</strong></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile