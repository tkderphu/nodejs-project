import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { Post } from "../../model/Post"
import { fetchAllPostAction } from "../../redux/store/action/post/post.action"
import { getUserLoggined } from "../../service/AuthenLoginResponse"
import AlertConponent from "../common/AlertComponent"
import { PageResult } from "../common/model"
import PagingComponent from "../paging/PagingComponent"

export default function HomeFollowing() {
    const dispatch = useDispatch()
    const fetchPostState: {
        pageResult: PageResult<Post>,
        loading: boolean,
        hasError: boolean,
        error: any
    } = useSelector((state: any) => {
        return state.fetchAllPost
    })
    const location = useLocation()
    if (location.state == null) {
        location.state = {
            page: 1
        }
    }
    const [useMode, setUseMode] = useState<"TITLE" | "PREVIEW">("TITLE")
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchAllPostAction(`type=${"FOLLOWED"}&userId=${getUserLoggined()._id}`, location.state.page))
    }, [location.state?.page])

    if (fetchPostState.loading || fetchPostState.hasError) {
        return <AlertConponent error={fetchPostState.error} hasError={fetchPostState.hasError} loading={fetchPostState.loading} />
    }
    return (
        <>
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
            {fetchPostState?.pageResult?.list.map((post, idx) => (
                <div className="card mb-3" key={idx}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div className="text-primary fw-bold">{post.user?.fullName}</div>
                            <div className="text-muted small">
                                {post.timestamps?.createdAt} ・ {"6 min read"}
                            </div>
                        </div>
                        <h6 className="mt-2">
                            <Link to={`/posts/${post._id}`} className="text-decoration-none">
                                {post.title}
                            </Link>
                            {/* {post.pinned && <i className="fas fa-thumbtack text-primary ms-2"></i>} */}
                        </h6>
                        {/* {post.type && <span className="badge bg-primary">{post.type}</span>} */}
                        <div className="mt-2">
                            {post.taggings &&
                                post.taggings.map((tag, tagIdx) => {
                                    return (
                                        <Link to={`/search?q=tag:${tag.name}`} state={{ q: "tag:" + tag.name, actualValue: tag.name }}>
                                            <span
                                                key={tagIdx}
                                                className="badge bg-secondary me-1"
                                            >
                                                @{tag.name}
                                            </span>
                                        </Link>
                                    )
                                })}
                        </div>
                        {(useMode === "PREVIEW") && (
                            <div className="text-truncate" dangerouslySetInnerHTML={{ __html: post.content }}>

                            </div>
                        )}
                        <div className="mt-2 d-flex align-items-center  text-muted small" >
                            <div className="me-3">
                                <i className="fas fa-eye me-1"></i>
                                {post.view}
                            </div>
                            <div className="me-3">
                                <i className="fas fa-heart me-1"></i>
                                {post.like}
                            </div>
                            <div className="me-3">
                                <i className="fas fa-comment me-1"></i>
                                {post.comment}
                            </div>
                            <div>
                                <i className="fas fa-bookmark me-1"></i>
                                {post.bookmark}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="d-flex justify-content-center">
                {fetchPostState.pageResult && <PagingComponent
                    currentPage={fetchPostState.pageResult.currentPage}
                    totalPage={fetchPostState.pageResult.totalPage}
                />}
            </div>
        </>
    )

}