
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


    const dispatch = useDispatch()
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchAllPostAction({}))
    }, [])

    const [useNav, setUseNav] = useState<"POST" | "SERIES" | "FOLLOWING" | "BOOKMARK">("POST")
    const [useMode, setUseMode] = useState<"TITLE" | "PREVIEW">("TITLE")
    return (
        <>

            <div className="container-fluid bg-dark text-white text-center py-4">
                <button className="btn btn-secondary mx-3"><a className="nav-link" href="/create-post">Viết bài</a></button>
                <button className="btn btn-secondary mx-3"><a className="nav-link" href="/series/create">Tạo series</a></button>

            </div>

            <div className="container mt-3">
                <ul className="nav nav-tabs">
                    {!getUserLoggined() ? "" : <li className={"nav-item"}><Link className={useNav == 'POST' ? "nav-link active" : "nav-link"} to={`/`} onClick={() => setUseNav("POST")}>Bài viết</Link></li>}
                    {!getUserLoggined() ? "" : <li className={"nav-item"}><Link className={useNav == 'FOLLOWING' ? "nav-link active" : "nav-link"} to={`my-followings`} onClick={() => setUseNav("FOLLOWING")}>Người đang theo dõi</Link></li>}
                    {!getUserLoggined() ? "" : <li className={"nav-item"}><Link className={useNav == 'BOOKMARK' ? "nav-link active" : "nav-link"} to={"my-bookmarks"} onClick={() => setUseNav("BOOKMARK")}>Bookmark của tôi</Link></li>}
                    {!getUserLoggined() ? "" : <li className={"nav-item"}><Link className={useNav == 'SERIES' ? "nav-link active" : "nav-link"} to={"series"} onClick={() => setUseNav("SERIES")}>Series</Link></li>}
                </ul>
            </div>

            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-8">
                        <div className="d-flex justify-content-end">
                            <button className={`btn active-btn mx-3 ${useMode === 'TITLE' ? "btn-active" : ""}`}
                            data-toggle="tooltip" data-placement="top" title="Chỉ xem tiêu đề"
                            onClick={() => {
                                setUseMode("TITLE")
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-card-text" viewBox="0 0 16 16">
                                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                                    <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
                                </svg>
                            </button>
                            <button className={`btn active-btn ${useMode === 'PREVIEW' ? "btn-active" : ""}`}
                            data-toggle="tooltip" data-placement="top" title="Xem trước nội dụng"
                            onClick={() => {
                                setUseMode("PREVIEW")
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
                                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                                </svg>
                            </button>
                        </div>
                        <Outlet />
                    </div>
                    <div className="col-md-4 sticky-sidebar">

                        <h5 className="text-primary ">Các tác giả hàng đầu</h5>
                        <ul className="list-group">
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

                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home