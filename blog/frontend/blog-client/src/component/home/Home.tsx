
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



    const [useNav, setUseNav] = useState<"POST" | "SERIES" | "FOLLOWING" | "BOOKMARK">("POST")
    const [useMode, setUseMode] = useState<"TITLE" | "PREVIEW">("TITLE")
    return (
        <>

            <div className="container-fluid text-white text-center py-4 position-relative" style={{ overflow: 'hidden' }}>

                <div
                    style={{
                        backgroundImage: "url('https://www.shutterstock.com/image-vector/blog-content-development-blogging-business-600nw-1763313434.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0.25,
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 0
                    }}
                ></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <button className="btn btn-secondary mx-3"><a className="nav-link" href="/create-post">Viết bài</a></button>
                    <button className="btn btn-secondary mx-3"><a className="nav-link" href="/series/create">Tạo series</a></button>
                </div>

            </div>

            <div className="container mt-3">
                <ul className="nav nav-tabs">
                    {!getUserLoggined() ? "" : <li className={"nav-item"}><Link className={useNav == 'POST' ? "nav-link active" : "nav-link"} to={`/`} onClick={() => setUseNav("POST")}>Bài viết</Link></li>}
                    {!getUserLoggined() ? "" : <li className={"nav-item"}><Link className={useNav == 'FOLLOWING' ? "nav-link active" : "nav-link"} to={`my-followings`} onClick={() => setUseNav("FOLLOWING")}>Đang theo dõi</Link></li>}
                    {!getUserLoggined() ? "" : <li className={"nav-item"}><Link className={useNav == 'BOOKMARK' ? "nav-link active" : "nav-link"} to={"my-bookmarks"} onClick={() => setUseNav("BOOKMARK")}>Bookmark của tôi</Link></li>}
                    {!getUserLoggined() ? "" : <li className={"nav-item"}><Link className={useNav == 'SERIES' ? "nav-link active" : "nav-link"} to={"series"} onClick={() => setUseNav("SERIES")}>Series</Link></li>}
                </ul>
            </div>

            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-8">
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