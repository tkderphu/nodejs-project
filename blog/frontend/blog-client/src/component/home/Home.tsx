
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Post } from "../../model/Post"
import { fetchAllPostAction } from "../../redux/store/action/post/post.action"
import { getUserLoggined } from "../../service/AuthenLoginResponse"
import { PageResult } from "../common/model"
import PostSimple from "../post/PostSimple"
import AuthorComponent from "../profile/Author"
import Author from "../profile/Author"
import "./Home.css"
function Home(props: {
    activeTab?: "POST" | "SERIES" | "FOLLOWING" | "BOOKMARK"
} = { activeTab: "POST" }) {
    const postResp: {
        pageResult: PageResult<Post>,
        hasError: boolean,
        loading: boolean
    } = useSelector((state: any) => {
        return state.fetchAllPost
    })

    const [filter, setFilter] = useState<{
        taggingNames?: Array<string>,
        userId?: string,
        keyword?: string,
        timestamps?: {
            startDate: any,
            endDate: any
        },
        userFullName?: string
    }>()

    const dispatch = useDispatch()
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchAllPostAction({}))
    }, [])

    useEffect(() => {
        if (filter) {
            //@ts-ignore
            dispatch(fetchAllPostAction(filter))
        }
    }, [filter])

    return (
        <>

            <div className="container-fluid bg-dark text-white text-center py-4">
                <button className="btn btn-secondary mx-3"><a className="nav-link" href="/create-post">Viết bài</a></button>
                <button className="btn btn-secondary mx-3"><a className="nav-link" href="/series/create">Tạo series</a></button>

            </div>

            <div className="container mt-3">
                <ul className="nav nav-tabs">
                    <li className="nav-item"><Link className={props.activeTab == 'POST' ? "nav-link active" : "nav-item"} to="/">Bài viết</Link></li>
                    {!getUserLoggined() ? "" : <li className={props.activeTab == 'FOLLOWING' ? "nav-link active" : "nav-item"}><Link className="nav-link" to={`/followings/${getUserLoggined()._id}`}>Người đang theo dõi</Link></li>}
                    {!getUserLoggined() ? "" : <li className={props.activeTab == 'BOOKMARK' ? "nav-link active" : "nav-item"}><Link className="nav-link" to={"/bookmarks/" + getUserLoggined()._id}>Bookmark của tôi</Link></li>}
                    {!getUserLoggined() ? "" : <li className={props.activeTab == 'BOOKMARK' ? "nav-link active" : "nav-item"}><Link className="nav-link" to={"/bookmarks/" + getUserLoggined()._id}>Series</Link></li>}
                </ul>
            </div>

            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-8">
                        <div className="d-flex align-items-center ">
                            <h3>Date</h3>
                            <div className="mx-3">
                                <div className="mb-3"><span>Start</span>: <input type={'date'} /> </div>
                                <div className="mb-3"> <span>End</span>: <input type={'date'} /></div>
                            </div>
                        </div>
                        <div className="d-flex">
                            {filter?.taggingNames && <h3>Tags</h3>}
                            <div className="d-flex flex-wrap">
                                {filter?.taggingNames?.map(tag => {
                                    return (
                                        <>
                                            <div className="mx-3 mb-3">
                                                <span style={{ backgroundColor: "gray" }}>{tag}</span>
                                                <button onClick={() => {
                                                    const taggingNames = filter?.taggingNames || new Array()
                                                    const newArr = taggingNames.filter(name => name != tag)
                                                    if (newArr.length == 0) {
                                                        setFilter((prev) => ({
                                                            ...prev,
                                                            taggingNames: undefined
                                                        }))
                                                    } else {
                                                        setFilter((prev) => ({
                                                            ...prev,
                                                            taggingNames: new Array(...newArr)
                                                        }))
                                                    }

                                                }}>X</button>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>

                        </div>
                        <div className="d-flex">
                            {filter?.userId && (<>
                                <div className="d-flex align-items-center">
                                    <h3>Author</h3>
                                    <div className="mx-5">
                                        <AuthorComponent />

                                    </div>
                                    <button onClick={() => {
                                        setFilter((prev) => ({
                                            ...prev,
                                            userId: undefined
                                        }))
                                    }}>X</button>
                                </div>
                                {/* <div className="d-flex flex-wrap">
                                    <div className="mx-3 mb-3">
                                        <span style={{ backgroundColor: "gray" }}>{filter?.userFullName}</span>
                                        <button onClick={() => {
                                            setFilter((prev) => ({
                                                ...prev,
                                                userId: undefined
                                            }))
                                        }}>X</button>
                                    </div>
                                </div> */}

                            </>)}
                        </div>
                        {postResp?.pageResult?.list?.map(post => {
                            return (
                                <div className="card mb-3">
                                    <PostSimple post={post} />
                                </div>
                            )
                        })}
                    </div>

                    <div className="col-md-4 sticky-sidebar">

                        <h5 className="text-primary ">Top authors</h5>
                        <ul className="list-group">
                            <li className="list-group-item d-flex align-items-center">
                                <img src="top_author1.jpg" alt="Top Author" className="rounded-circle me-3" width="40" />
                                <div>
                                    <span>Nguyễn Văn A</span><br />
                                    <small className="text-muted">👁️ 5000 | ⭐ 150 | 📝 200 | 👥 300 | 📈 10000</small>
                                </div>
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