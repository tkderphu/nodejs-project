import { Link } from "react-router-dom"
import { Post } from "../../model/Post"
import { PageResult } from "../common/model"
import PagingComponent from "../paging/PagingComponent"
import PostSimple from "../post/PostSimple"

export default function SearchPost(props: {
    pageResult: PageResult<Post>
}) {
    return <>
        {props.pageResult?.list?.map((post, idx) => (
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
                    <div className="text-truncate" dangerouslySetInnerHTML={{ __html: post.content }}>
                    </div>
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
        {props.pageResult?.list?.length > 0 && (<div className="d-flex justify-content-center">
            {props.pageResult && <PagingComponent
                currentPage={props.pageResult.currentPage}
                totalPage={props.pageResult.totalPage}
            />}
        </div>)}
    </>
}