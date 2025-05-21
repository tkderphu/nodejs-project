
import { url } from "inspector"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { Post } from "../../model/Post"
import { fetchAllPostAction } from "../../redux/store/action/post/post.action"
import { getUserLoggined } from "../../service/AuthenLoginResponse"
import profileService from "../../service/profile.service"
import { PageResult } from "../common/model"
import AuthorComponent from "../post/AuthorComponent"

import "./Home.css"

function Home(props: {
    activeTab?: "POST" | "SERIES" | "FOLLOWING" | "BOOKMARK"
} = { activeTab: "POST" }) {

    const [authorStats, setAuthorStats] = useState<[]>()

    useEffect(() => {
        profileService.getAuthorStats().then(resp => {
            setAuthorStats(resp.data)
        })
    }, [])
    
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
                            <Link to={"/create-post"} className="btn btn-light btn-lg me-2">Viết bài</Link>
                            <Link to={"/create-series"} className="btn btn-outline-light btn-lg">Tạo series</Link>
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
                            {authorStats?.map((author: any) => {
                                return (
                                    <div className="row mb-4">
                                        <div className=" border-0 shadow-sm h-100">
                                            <div className="card-body">
                                                <div className="d-flex align-items-center mb-3">
                                                    <img
                                                        src={author.avatar}
                                                        className="rounded-circle  me-1"
                                                        alt="Author avatar"
                                                        width={50}
                                                        height={50}
                                                    />
                                                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                                                        <h5 className="card-title mb-0">{author.fullName}</h5>
                                                        <span className="badge badge-top-author">Tác giả hàng đầu</span>
                                                    </div>
                                                </div>
                                                <div className="row text-center my-3 author-stats">
                                                    <div className="col-3">
                                                        <div className="d-flex flex-column">
                                                            <i className="fas fa-file-alt text-primary mb-1" style={{ padding: "5px" }} />
                                                            <span className="small text-muted">Bài viết</span>
                                                            <strong>{author.countPost}</strong>
                                                        </div>
                                                    </div>
                                                    <div className="col-3">
                                                        <div className="d-flex flex-column">
                                                            <i className="bi bi-star-fill text-warning mb-1" />
                                                            <span className="small text-muted">Thích</span>
                                                            <strong>{author.countLike}</strong>
                                                        </div>
                                                    </div>
                                                    <div className="col-3">
                                                        <div className="d-flex flex-column">
                                                            <i className="bi bi-chat-left-text text-info mb-1" />
                                                            <span className="small text-muted">Bình luận</span>
                                                            <strong>{author.countComment}</strong>
                                                        </div>
                                                    </div>
                                                    <div className="col-3">
                                                        <div className="d-flex flex-column">
                                                            <i className="bi bi-people text-success mb-1" />
                                                            <span className="small text-muted">Theo dõi</span>
                                                            <strong>{author.countFollower}</strong>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="d-grid gap-2 mt-3">
                                                    <button className="btn btn-outline-primary">
                                                        <i className="bi bi-person-plus me-2" />
                                                        Theo dõi
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}


                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Home