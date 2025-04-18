
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Post } from "../../model/Post"
import { fetchAllPostAction } from "../../redux/store/action/post/post.action"
import { getUserLoggined } from "../../service/AuthenLoginResponse"
import { PageResult } from "../common/model"
import PostSimple from "../post/PostSimple"
import AuthorComponent from "../profile/Author"
import Author from "../profile/Author"
import "./Search.css"
function Search() {


    const [searchType, setSearchType] = useState<"POST" | "AUTHOR">("POST")
    const location = useLocation()
    const [search, setSearch] = useState("")
    if(location.state == null) {
        location.state = {
            q: ""
        }
    }
    console.log("search: ", search)
    useEffect(() => {
        console.log("search2:",location.state)
        setSearch(location.state.q)
    }, [location.state.q])
    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-9">
                        <div className="d-flex mb-3">
                            <input
                                type="text"
                                className="form-control me-3"
                                value={search}
                                onChange={(e: any) => {
                                    setSearch(e.target.value)
                                }}
                                placeholder="Search..."
                            />
                            <button className="btn btn-primary">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>

                        <ul className="nav nav-tabs mb-3">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Bài viết</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">Tác giả</a>
                            </li>
                        </ul>

                        <div className="d-flex justify-content-between mb-2">
                            <span><strong>409</strong> kết quả</span>

                            <div className="dropdown">
                                <button className="btn dropdown-toggle" type="button" id="dropdown-sort" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span >Sort by: <strong style={{color:"#6495ED"}}>Tốt nhất</strong></span>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdown-sort">
                                    <li><a className="dropdown-item hover-item-search" href="#">Tốt nhất</a></li>
                                    <li><a className="dropdown-item hover-item-search" href="#">Nhiều lượt xem nhất</a></li>
                                    <li><a className="dropdown-item hover-item-search" href="#">Nhiều bình luận nhất</a></li>
                                    <li><a className="dropdown-item hover-item-search" href="#">Mới nhất</a></li>
                                    <li><a className="dropdown-item hover-item-search" href="#">Cũ nhất</a></li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            {}
                        </div>
                    </div>
                    <div className="col-md-3 sticky-sidebar">
                        <h6 className="text-uppercase text-muted">Cú pháp tìm kiếm</h6>
                        <div className="d-flex flex-column align-items-start mb-1">
                            <span className="badge bg-light text-dark border">title:Git</span>
                            <p className="text-muted">Chứa "Git" trong tiêu đề</p>
                        </div>
                        <div className="d-flex flex-column align-items-start mb-1">
                            <span className="badge bg-light text-dark border">body:Ruby</span>
                            <p className="text-muted">Chứa "Ruby" trong nội dung</p>
                        </div>
                        <div className="d-flex flex-column align-items-start mb-1">
                            <span className="badge bg-light text-dark border">user:name</span>
                            <span className="text-muted">Tạo bởi người dùng có tên là "name"</span>
                        </div>
                        <div className="d-flex flex-column align-items-start mb-1">
                            <span className="badge bg-light text-dark border">tag:Rails</span>
                            <span className="text-muted">Có nhãn là "Rails", nếu muốn tìm kiếm nhiều nhãn thì spanhải phân cách dấu ","</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search