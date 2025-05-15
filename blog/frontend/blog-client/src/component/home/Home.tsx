
import { url } from "inspector"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { Post } from "../../model/Post"
import { fetchAllPostAction } from "../../redux/store/action/post/post.action"
import { getUserLoggined } from "../../service/AuthenLoginResponse"
import { PageResult } from "../common/model"
import AuthorComponent from "../post/AuthorComponent"

import "./Home.css"

function Home(props: {
    activeTab?: "POST" | "SERIES" | "FOLLOWING" | "BOOKMARK"
} = { activeTab: "POST" }) {


    return (
        <>

            <div className="bg-primary text-white py-4 mb-4">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <h1 className="display-5 fw-bold">VIOSMASH Tech Blog</h1>
                            <p className="lead">Chia sẻ kiến thức về công nghệ, lập trình và machine learning</p>
                        </div>
                        <div className="col-md-4 text-end">
                            <button className="btn btn-light btn-lg me-2">Viết bài</button>
                            <button className="btn btn-outline-light btn-lg">Tạo series</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-8">
                        <Outlet />
                    </div>
                    <div className="col-md-4 sticky-sidebar">

                        <div className="position-sticky top-0 bg-white z-3" ><h3 className="mt-0">Các tác giả hàng đầu</h3></div>
                        {/* <div className="container-fluid"> */}

                        {/* Author cards */}
                        <div className="row">
                            {/* Author 1 */}
                            <div className="row mb-4">
                                <div className=" border-0 shadow-sm h-100">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center mb-3">
                                            <img
                                                src="https://via.placeholder.com/50"
                                                className="rounded-circle me-3"
                                                alt="Author avatar"
                                                width={50}
                                                height={50}
                                            />
                                            <div className="d-flex flex-wrap justify-content-between align-items-center">
                                                <h5 className="card-title mb-0">Trần Thị B</h5>
                                                <span className="badge badge-top-author">Tác giả hàng đầu</span>
                                            </div>
                                        </div>
                                        <div className="row text-center my-3 author-stats">
                                            <div className="col-3">
                                                <div className="d-flex flex-column">
                                                    <i className="bi bi-eye text-primary mb-1" />
                                                    <span className="small text-muted">Xem</span>
                                                    <strong>4,000</strong>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-flex flex-column">
                                                    <i className="bi bi-star-fill text-warning mb-1" />
                                                    <span className="small text-muted">Thích</span>
                                                    <strong>120</strong>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-flex flex-column">
                                                    <i className="bi bi-chat-left-text text-info mb-1" />
                                                    <span className="small text-muted">Bình luận</span>
                                                    <strong>180</strong>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-flex flex-column">
                                                    <i className="bi bi-people text-success mb-1" />
                                                    <span className="small text-muted">Theo dõi</span>
                                                    <strong>250</strong>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="progress mt-3" style={{ height: 10 }}>
                                                <div
                                                    className="progress-bar bg-success"
                                                    role="progressbar"
                                                    style={{ width: "90%" }}
                                                    aria-valuenow={9000}
                                                    aria-valuemin={0}
                                                    aria-valuemax={10000}
                                                />
                                            </div>
                                            <div className="d-flex justify-content-between mt-2">
                                                <small className="text-muted">Reputation Points</small>
                                                <small className="fw-bold">9,000</small>
                                            </div> */}
                                        <div className="d-grid gap-2 mt-3">
                                            <button className="btn btn-outline-primary">
                                                <i className="bi bi-person-plus me-2" />
                                                Theo dõi
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Author 2 */}
                            <div className="row mb-4">
                                <div className=" border-0 shadow-sm  author-card">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center mb-3">
                                            <img
                                                src="https://via.placeholder.com/50"
                                                className="rounded-circle me-3"
                                                alt="Author avatar"
                                                width={50}
                                                height={50}
                                            />
                                            <div>
                                                <h5 className="card-title mb-0">Lê Công C</h5>
                                                <span className="badge badge-top-author">Top Author</span>
                                            </div>
                                        </div>
                                        <div className="row text-center my-3 author-stats">
                                            <div className="col-3">
                                                <div className="d-flex flex-column">
                                                    <i className="bi bi-eye text-primary mb-1" />
                                                    <span className="small text-muted"></span>
                                                    <strong>3,500</strong>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-flex flex-column">
                                                    <i className="bi bi-star-fill text-warning mb-1" />
                                                    <span className="small text-muted"></span>
                                                    <strong>100</strong>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-flex flex-column">
                                                    <i className="bi bi-chat-left-text text-info mb-1" />
                                                    <span className="small text-muted"></span>
                                                    <strong>160</strong>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-flex flex-column">
                                                    <i className="bi bi-people text-success mb-1" />
                                                    <span className="small text-muted"></span>
                                                    <strong>200</strong>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="progress mt-3" style={{ height: 10 }}>
                                            <div
                                                className="progress-bar bg-success"
                                                role="progressbar"
                                                style={{ width: "85%" }}
                                                aria-valuenow={8500}
                                                aria-valuemin={0}
                                                aria-valuemax={10000}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-between mt-2">
                                            <small className="text-muted">Reputation Points</small>
                                            <small className="fw-bold">8,500</small>
                                        </div>
                                        <div className="d-grid gap-2 mt-3">
                                            <button className="btn btn-outline-primary">
                                                <i className="bi bi-person-plus me-2" />
                                                Follow
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* You can add more author cards here following the same structure */}
                            {/* Just duplicating Lê Công C as seen in your image */}
                            <div className="row mb-4">
                                <div className=" border-0 shadow-sm h-100 author-card">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center mb-3">
                                            <img
                                                src="https://via.placeholder.com/50"
                                                className="rounded-circle me-3"
                                                alt="Author avatar"
                                                width={50}
                                                height={50}
                                            />
                                            <div>
                                                <h5 className="card-title mb-0">Lê Công C</h5>
                                                <span className="badge badge-top-author">Top Author</span>
                                            </div>
                                        </div>
                                        <div className="row text-center my-3 author-stats">
                                            <div className="col-3">
                                                <div className="d-flex flex-column">
                                                    <i className="bi bi-eye text-primary mb-1" />
                                                    <span className="small text-muted">Views</span>
                                                    <strong>3,500</strong>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-flex flex-column">
                                                    <i className="bi bi-star-fill text-warning mb-1" />
                                                    <span className="small text-muted">Stars</span>
                                                    <strong>100</strong>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-flex flex-column">
                                                    <i className="bi bi-chat-left-text text-info mb-1" />
                                                    <span className="small text-muted">Comments</span>
                                                    <strong>160</strong>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-flex flex-column">
                                                    <i className="bi bi-people text-success mb-1" />
                                                    <span className="small text-muted">Followers</span>
                                                    <strong>200</strong>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="progress mt-3" style={{ height: 10 }}>
                                            <div
                                                className="progress-bar bg-success"
                                                role="progressbar"
                                                style={{ width: "85%" }}
                                                aria-valuenow={8500}
                                                aria-valuemin={0}
                                                aria-valuemax={10000}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-between mt-2">
                                            <small className="text-muted">Reputation Points</small>
                                            <small className="fw-bold">8,500</small>
                                        </div>
                                        <div className="d-grid gap-2 mt-3">
                                            <button className="btn btn-outline-primary">
                                                <i className="bi bi-person-plus me-2" />
                                                Follow
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* </div> */}
                        </div>

                        {/* <ul className="list-group">
                            <li className="list-group-item d-flex align-items-center">
                                <AuthorComponent />
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                                <img src="top_author2.jpg" alt="Top Author" className="rounded-circle me-3" width="40" />
                                <div>
                                    <span>Trần Thị B</span><br />
                                    <small className="text-muted">👁️ 4000 | ⭐ 120 | 📝 180 | 👥 250 | 📈 9000</small>
                                </div>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                                <img src="top_author3.jpg" alt="Top Author" className="rounded-circle me-3" width="40" />
                                <div>
                                    <span>Lê Công C</span><br />
                                    <small className="text-muted">👁️ 3500 | ⭐ 100 | 📝 160 | 👥 200 | 📈 8500</small>
                                </div>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                                <img src="top_author3.jpg" alt="Top Author" className="rounded-circle me-3" width="40" />
                                <div>
                                    <span>Lê Công C</span><br />
                                    <small className="text-muted">👁️ 3500 | ⭐ 100 | 📝 160 | 👥 200 | 📈 8500</small>
                                </div>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                                <img src="top_author3.jpg" alt="Top Author" className="rounded-circle me-3" width="40" />
                                <div>
                                    <span>Lê Công C</span><br />
                                    <small className="text-muted">👁️ 3500 | ⭐ 100 | 📝 160 | 👥 200 | 📈 8500</small>
                                </div>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                                <img src="top_author3.jpg" alt="Top Author" className="rounded-circle me-3" width="40" />
                                <div>
                                    <span>Lê Công C</span><br />
                                    <small className="text-muted">👁️ 3500 | ⭐ 100 | 📝 160 | 👥 200 | 📈 8500</small>
                                </div>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                                <img src="top_author3.jpg" alt="Top Author" className="rounded-circle me-3" width="40" />
                                <div>
                                    <span>Lê Công C</span><br />
                                    <small className="text-muted">👁️ 3500 | ⭐ 100 | 📝 160 | 👥 200 | 📈 8500</small>
                                </div>
                            </li>

                        </ul> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home