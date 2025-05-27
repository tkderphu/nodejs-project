import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Comment } from "../../model/Comment";
import { fetchAllCommentAction } from "../../redux/store/action/comment/comment.action";
import "./Comment.css"
import { formatDate } from '../../utils/utils'
import FormCommentComponent from "./FormCommentComponent";
import ModalComponent from "../common/modal/ModalComponent";
import { ReportReq } from "../../service/report.service";
import FullScreenLoader from "../common/fullspinner/FullScreenLoader";
import { reportAction } from "../../redux/store/action/report/report.action";
export default function CommentComponent1() {
    const postId = useParams().id
    const fetchAllCommentState: {
        loading: boolean,
        comments: Comment[],
        hasError: boolean,
        error: any
    } = useSelector((state: any) => {
        return state.fetchAllComment
    })
    const dispatch = useDispatch()
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchAllCommentAction(postId))
    }, [])

    console.log("comment: ", fetchAllCommentState)

    const [reply, setReply] = useState<any>({

    })

    const handleOpenReplyForm = (commentId: string) => {
        setReply((prev: any) => ({
            ...prev,
            [commentId]: true
        }))
    }

    const handleCloseReplyForm = (commentId: string) => {
        setReply((prev: any) => ({
            ...prev,
            [commentId]: false
        }))
    }

    useEffect(() => {
        if (location.hash) {
            console.log("hash: ", location.hash)
            const id = location.hash.replace('#', '');
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [fetchAllCommentState.loading, location.hash]);
    useEffect(() => {
        const toggleButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');

        toggleButtons.forEach(button => {
            const handler = function (this: Element) {
                const expanded = this.getAttribute('aria-expanded') === 'true';
                const icon = this.querySelector('i');
                const textSpan = this.querySelector('span');
                const targetId = this.getAttribute('data-bs-target')?.substring(1) || '';
                const replyContainer = document.getElementById(targetId);

                if (!icon || !textSpan || !replyContainer) return;

                const replyCount = replyContainer.querySelectorAll('.d-flex').length;

                if (expanded) {
                    icon.classList.remove('fa-chevron-down');

                    textSpan.textContent = 'Ẩn câu trả lời';
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                    textSpan.textContent = `Xem ${replyCount} câu trả lời`;

                }
            };

            button.addEventListener('click', handler);

            // Optional: cleanup on unmount
            return () => {
                button.removeEventListener('click', handler);
            };
        });
    }, []);

    const [openModalReport, setOpenModalReport] = useState<string>("0")
    const [reasonReport, setReasonReport] = useState<string>("")
    const reportState: {
        loading: boolean
    } = useSelector((state: any) => {
        return state.report
    })

    useEffect(() => {
        if (reportState.loading) {
            setOpenModalReport("0")
        }
    }, [reportState])
    return (
        <div className="container-fluid py-5">
            <div className="comment-section">
                {/* Comment input area */}
                <FormCommentComponent />
                {/* Comments list */}
                <div className="comment-card p-4 text-start">

                    {fetchAllCommentState.comments?.map((comment, index) => {
                        return (
                            <>
                                <div className="d-flex mb-4" id={`comment_id_${comment._id}`}>
                                    <div className="me-3">
                                        <img
                                            src={comment.user?.image_url}
                                            alt="Fuu Nguyen"
                                            className="comment-avatar"
                                        />
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div>
                                                <Link to={`/profile/${comment.user?._id}`} className="comment-user">
                                                    {comment.user?.fullName}
                                                </Link>
                                                <span className="ms-2 text-muted">@{comment.user?.nickname}</span>
                                            </div>
                                            <span className="comment-time">{formatDate(comment.createdDate)}</span>
                                        </div>
                                        <p className="comment-body">
                                            {comment.content}
                                        </p>
                                        <div className="d-flex align-items-center mt-2">
                                            <div className="me-4 comment-action">
                                                <i className="far fa-thumbs-up me-1" />
                                                <span>0</span>
                                            </div>
                                            <div className="me-4 comment-action">
                                                <i className="far fa-comment-dots me-1" />
                                                <span>Trả lời</span>
                                            </div>
                                            <div className="comment-action" onClick={() => setOpenModalReport(comment._id)} >
                                                <i className="far fa-flag" />
                                            </div>
                                        </div>

                                        {/* Nested comments toggle button */}
                                        {comment.nestedComments && comment.nestedComments.length > 0 && (
                                            <>
                                                <div className="mt-3">
                                                    <button
                                                        className="btn btn-sm btn-light d-flex align-items-center"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={`#nestedComments${index}`}
                                                        aria-expanded="false"
                                                    >
                                                        <i className="fas fa-chevron-down me-2" />
                                                        <span>Xem {comment.nestedComments?.length || 0} câu trả lời</span>
                                                    </button>
                                                </div>
                                                <div className="collapse mt-3" id={`nestedComments${index}`}>
                                                    <div className="ps-4 border-start border-2 ms-2">
                                                        {comment.nestedComments?.map(nested => {
                                                            return (
                                                                <div className="d-flex mb-3" id={`comment_id_${nested._id}`}>
                                                                    <div className="me-3">
                                                                        <img
                                                                            src={nested.user?.image_url}
                                                                            alt="User"
                                                                            className="comment-avatar"
                                                                            style={{ width: 36, height: 36 }}
                                                                        />
                                                                    </div>
                                                                    <div className="flex-grow-1">
                                                                        <div className="d-flex justify-content-between align-items-start">
                                                                            <div>
                                                                                <Link to={`/profile/${nested.user?._id}`} className="comment-user">
                                                                                    {nested.user?.fullName}
                                                                                </Link>
                                                                                <span className="ms-2 text-muted">@{nested.user.nickname}</span>
                                                                            </div>
                                                                            <span className="comment-time">
                                                                                {formatDate(nested.createdDate)}
                                                                            </span>
                                                                        </div>
                                                                        <p className="comment-body">
                                                                            {nested.replyComment && (
                                                                                <Link to={`/profile/${nested.replyComment?.user?._id}`} className="comment-mention">
                                                                                    @{nested.replyComment?.user?.nickname + " "}
                                                                                </Link>
                                                                            )}
                                                                            {nested.content}
                                                                        </p>
                                                                        <div className="d-flex align-items-center mt-2">
                                                                            <div className="me-4 comment-action">
                                                                                <i className="far fa-thumbs-up me-1" />
                                                                                <span>1</span>
                                                                            </div>
                                                                            <div className="me-4 comment-action">
                                                                                <i className="far fa-comment-dots me-1" />
                                                                                <span>Trả lời</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </>
                                        )}


                                    </div>
                                </div>
                                <ModalComponent
                                    show={comment._id == openModalReport}
                                    title={"Tố cáo bình luận: " + comment.content}
                                    onClose={() => setOpenModalReport("0")}
                                    onSave={() => {
                                        const obj: ReportReq = {
                                            type: "COMMENT",
                                            typeId: comment._id,
                                            reason: reasonReport
                                        }
                                        console.log("vcvcv")
                                        //@ts-ignore
                                        dispatch(reportAction(obj))
                                    }}
                                >
                                    {reportState.loading && (<FullScreenLoader />)}
                                    <div className="form-group text-start">
                                        <label htmlFor="exampleFormControlInput1">Lý do tố cáo tố cáo</label>
                                        <textarea className="form-control mt-2" value={reasonReport} onChange={(e: any) => {
                                            setReasonReport(e.target.value)
                                        }} id="exampleFormControlInput1" placeholder="Lý do: ít nhất 10 ký tự">

                                        </textarea>
                                    </div>
                                </ModalComponent>
                            </>
                        )
                    })}


                </div>
            </div>
        </div>

    )
}