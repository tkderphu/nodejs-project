
import { stat } from "fs"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { Post } from "../../model/Post"
import { fetchAllPostAction } from "../../redux/store/action/post/post.action"
import { searchAction } from "../../redux/store/action/search/search.action"
import { getUserLoggined } from "../../service/AuthenLoginResponse"
import searchService from "../../service/search.service"
import AlertConponent from "../common/AlertComponent"
import { PageResult } from "../common/model"
import PostSimple from "../post/PostSimple"
import AuthorComponent from "../profile/Author"
import Author from "../profile/Author"
import "./Search.css"
import SearchAuthor from "./SearchAuthor"
import SearchPost from "./SearchPost"

const sort: any = {
    "relevance": {
        "name": "Tốt nhất",
        "type": "desc"
    },
    "view": {
        "name": "Nhiều lượt xem nhất",
        "type": "desc"
    },
    comment: {
        "name": "Nhiều bình luận nhất",
        "type": "desc"
    },
    oldest: {
        name: "Cũ nhất",
        type: "desc"
    },
    newest: {
        name: "Mới nhất",
        type: "asc"
    }
}

function Search() {

    const navigate = useNavigate()
    const [searchType, setSearchType] = useState<{
        type: "POST" | "AUTHOR",
        isChanged: boolean
    }>({
        type: "POST",
        isChanged: false
    })
    const location = useLocation()
    const [query, setQuery] = useState('')
    const [sortE, setSortE] = useState<undefined | {
        sortBy: string,
        sortType: string
    }>()
    const [page, setPage] = useState(1)

    const dispatch = useDispatch()

    const searchState: {
        loading: boolean,
        hasError: boolean,
        error: any,
        pageResult: PageResult<any>
    } = useSelector((state: any) => {
        return state.search
    })

    useEffect(() => {
        if (location.state) {
            setQuery(location.state.q)
        }
        //@ts-ignore
        dispatch(searchAction(location.search))

    }, [location.search || location.state])


    useEffect(() => {
        if ((page && sortE)) {
            handleSearch()
        }
    }, [(page && sortE)])

    useEffect(() => {
        console.log("change vcl")
        if (searchType.isChanged || sortE) {
            handleSearch()
        }

    }, [searchType || sortE])


    const handleSearch = () => {

        let search = `q=${query}&type=${searchType.type.toLowerCase()}`
        if (searchType.type == "POST") {
            if (sortE) {
                search += `&sortBy=${sortE?.sortBy}&sortType=${sortE?.sortType}`
            }
        }
        if (page != 1) {
            search += `&page=${page}`
        }
        navigate(`?${search}`)

    }


    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-9">
                        <div className="d-flex mb-3 search-container">
                            <input
                                type="text"
                                name='q'
                                className="form-control  search-input"
                                value={query}
                                onChange={(e: any) => {
                                    setQuery(e.target.value)
                                }}
                                placeholder="Search..."
                            />
                            <button className="btn btn-primary" onClick={() => {
                                handleSearch()
                            }}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>

                        <ul className="nav nav-tabs mb-3">
                            <li className="nav-item">
                                <button className={`nav-link ${searchType.type === "POST" ? 'active' : ""}`} onClick={() => setSearchType((prev) => ({ ...prev, type: "POST" }))}>Bài viết</button>
                            </li>

                            <li className="nav-item">
                                <button className={`nav-link ${searchType.type === "AUTHOR" ? 'active' : ""}`} onClick={() => setSearchType({ isChanged: true, type: "AUTHOR" })} >Tác giả</button>
                            </li>
                        </ul>

                        <div className="d-flex justify-content-between mb-2">
                            <span><strong>{searchState.pageResult?.totalItem || 0}</strong> kết quả</span>

                            {searchType.type === "POST" && (
                                <div className="dropdown">
                                    <select className="form-select" onChange={(e: any) => {
                                        setSortE({
                                            ...JSON.parse(e.target.value)
                                        })
                                    }}>
                                        {Object.entries(sort).map(([k, value]: any) => {
                                            return <li><option className="dropdown-item hover-item-search" value={JSON.stringify({
                                                sortType: value.type,
                                                sortBy: k
                                            })} >{value.name}</option></li>
                                        })}
                                    </select>
                                </div>
                            )}


                        </div>
                        <div>

                            {(searchState.loading || searchState.hasError) ? (<AlertConponent loading={searchState.loading} error={searchState.error} hasError={searchState.hasError} />) : (
                                <>
                                    {searchType.type === 'AUTHOR' && <SearchAuthor />}
                                    {searchType.type === 'POST' && <SearchPost pageResult={searchState.pageResult} />}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="col-md-3 sticky-sidebar search-tips text-start">
                        <h6 className="text-uppercase text-muted">Cú pháp tìm kiếm</h6>
                        <div className="d-flex flex-column align-items-start mb-1 search-tip-item">
                            <span className="badge bg-light text-dark border">title:Git</span>
                            <p className="text-muted">Chứa "Git" trong tiêu đề</p>
                        </div>
                        <div className="d-flex flex-column align-items-start mb-1 search-tip-item">
                            <span className="badge bg-light text-dark border">body:Ruby</span>
                            <p className="text-muted">Chứa "Ruby" trong nội dung</p>
                        </div>
                        <div className="d-flex flex-column align-items-start mb-1 search-tip-item">
                            <span className="badge bg-light text-dark border">user:name</span>
                            <span className="text-muted">Tạo bởi người dùng có tên là "name"</span>
                        </div>
                        <div className="d-flex flex-column align-items-start mb-1 search-tip-item">
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