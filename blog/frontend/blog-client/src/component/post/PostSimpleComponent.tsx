import { Link } from "react-router-dom";
import { Post } from "../../model/Post";
import { estimateReadingTime, formatDate, generateTagColors } from "../../utils/utils";

export default function PostSimpleComponent(props: {
    post?: Post,
    showPreview: boolean
} = { showPreview: false }) {
    return (
        <>
            <div className="row ">
                <div className="col-1">
                    <img src={props?.post?.user?.image_url} alt="..." className="rounded-circle" width="50" height="50" />
                </div>
                <div className="col-11">
                    <div className="d-flex justify-content-between">
                        <Link className="text-decoration-none " to={"/profile/" + props.post?.user?._id}>{props.post?.user?.fullName}</Link>
                        <div className="text-muted small">
                            {formatDate(props.post?.timestamps?.createdAt)} ・ {`${estimateReadingTime(props.post?.content, 1000)} phút đọc`}
                        </div>
                    </div>
                    <div className=" text-start">
                        <Link to={`/posts/${props.post?._id}`} className="  text-decoration-none text-strong">
                            {props.post?.title}
                            <div style={{ display: "inline-block" }} className="mx-2">
                                {props.post?.taggings &&
                                    props.post?.taggings?.map((tag, tagIdx) => {
                                        return (
                                            <>
                                                <Link to={`/search?q=tag:${tag.name}`} state={{ q: "tag:" + tag.name, actualValue: tag.name }}>
                                                    {/* <span
                                                                key={tagIdx}
                                                                className="badge bg-secondary m-1"
                                                            >
                                                                @{tag.name}
                                                            </span> */}
                                                    <span
                                                        className="badge text-bold m-1 px-3 py-1 text-xs font-medium mr-2 mb-2 inline-block"
                                                        style={generateTagColors(tag.name)}
                                                    >
                                                        {tag.name}
                                                    </span>
                                                </Link>

                                            </>
                                        )
                                    })}
                            </div>
                        </Link>
                        {/* {post.pinned && <i className="fas fa-thumbtack text-primary ms-2"></i>} */}
                    </div>
                    {(props.showPreview) && (
                        <div className="text-truncate" dangerouslySetInnerHTML={{ __html: props?.post?.content }}>

                        </div>
                    )}
                    <div className="mt-2 d-flex align-items-center  text-muted small" >
                        <div className="me-3">
                            <i className="fas fa-eye me-1"></i>
                            {props?.post?.view}
                        </div>
                        <div className="me-3">
                            <i className="fas fa-heart me-1"></i>
                            {props?.post?.like}
                        </div>
                        <div className="me-3">
                            <i className="fas fa-comment me-1"></i>
                            {props?.post?.comment}
                        </div>
                        <div>
                            <i className="fas fa-bookmark me-1"></i>
                            {props?.post?.bookmark}
                        </div>
                    </div>
                </div>
            </div>
            <hr />

        </>
    )
}