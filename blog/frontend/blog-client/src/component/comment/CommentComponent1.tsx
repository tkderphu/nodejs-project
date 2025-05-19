import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllCommentAction } from "../../redux/store/action/comment/comment.action";
import "./Comment.css"
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
            console.log("hash: ",location.hash)
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
    
    return (
        <div className="container-fluid py-5">
            <div className="comment-section">
                {/* Comment input area */}
                <div className="comment-card mb-4">
                    <div className="card-body p-4">
                        <textarea
                            className="form-control comment-input mb-3"
                            placeholder="Viết bình luận của bạn..."
                            defaultValue={""}
                        />
                        <div className="d-flex justify-content-between mt-3">
                            <button className="btn comment-upload py-2 px-4">
                                <i className="fas fa-image me-2" />
                                Chọn ảnh
                            </button>
                            <button className="btn comment-submit py-2 px-5">Bình luận</button>
                        </div>
                    </div>
                </div>
                {/* Comments list */}
                <div className="comment-card p-4 text-start">
                    {/* Comment 1 */}
                    <div className="d-flex mb-4">
                        <div className="me-3">
                            <img
                                src="/api/placeholder/48/48"
                                alt="Fuu Nguyen"
                                className="comment-avatar"
                            />
                        </div>
                        <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <a href="#" className="comment-user">
                                        Fuu Nguyen
                                    </a>
                                    <span className="ms-2 text-muted">@donghainam</span>
                                </div>
                                <span className="comment-time">2025-05-11T07:34:12.651Z</span>
                            </div>
                            <p className="comment-body">bao cao thuc tap co so</p>
                            <div className="d-flex align-items-center mt-2">
                                <div className="me-4 comment-action">
                                    <i className="far fa-thumbs-up me-1" />
                                    <span>0</span>
                                </div>
                                <div className="me-4 comment-action">
                                    <i className="far fa-comment-dots me-1" />
                                    <span>Trả lời</span>
                                </div>
                                <div className="comment-action">
                                    <i className="far fa-flag" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="comment-divider" />
                    {/* Comment 2 with nested replies */}
                    <div className="d-flex mb-4">
                        <div className="me-3">
                            <img
                                src="/api/placeholder/48/48"
                                alt="Fuu Nguyen"
                                className="comment-avatar"
                            />
                        </div>
                        <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <a href="#" className="comment-user">
                                        Fuu Nguyen
                                    </a>
                                    <span className="ms-2 text-muted">@donghainam</span>
                                </div>
                                <span className="comment-time">2025-05-11T07:35:03.678Z</span>
                            </div>
                            <p className="comment-body">
                                <a href="#" className="comment-mention">
                                    @donghainam
                                </a>{" "}
                                haha
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
                                <div className="comment-action">
                                    <i className="far fa-flag" />
                                </div>
                            </div>
                            {/* Nested comments toggle button */}
                            <div className="mt-3">
                                <button
                                    className="btn btn-sm btn-light d-flex align-items-center"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#nestedComments1"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-chevron-down me-2" />
                                    <span>Xem 3 câu trả lời</span>
                                </button>
                            </div>
                            {/* Nested comments */}
                            <div className="collapse mt-3" id="nestedComments1">
                                <div className="ps-4 border-start border-2 ms-2">
                                    {/* Nested Comment 1 */}
                                    <div className="d-flex mb-3">
                                        <div className="me-3">
                                            <img
                                                src="/api/placeholder/36/36"
                                                alt="User"
                                                className="comment-avatar"
                                                style={{ width: 36, height: 36 }}
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <a href="#" className="comment-user">
                                                        Minh Tran
                                                    </a>
                                                    <span className="ms-2 text-muted">@minhtran</span>
                                                </div>
                                                <span className="comment-time">
                                                    2025-05-11T08:01:22.345Z
                                                </span>
                                            </div>
                                            <p className="comment-body">Bài tập đã nộp chưa bạn?</p>
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
                                    {/* Nested Comment 2 */}
                                    <div className="d-flex mb-3">
                                        <div className="me-3">
                                            <img
                                                src="/api/placeholder/36/36"
                                                alt="User"
                                                className="comment-avatar"
                                                style={{ width: 36, height: 36 }}
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <a href="#" className="comment-user">
                                                        Fuu Nguyen
                                                    </a>
                                                    <span className="ms-2 text-muted">@donghainam</span>
                                                </div>
                                                <span className="comment-time">
                                                    2025-05-11T08:15:44.123Z
                                                </span>
                                            </div>
                                            <p className="comment-body">
                                                <a href="#" className="comment-mention">
                                                    @minhtran
                                                </a>{" "}
                                                Mình nộp rồi, cảm ơn bạn đã nhắc
                                            </p>
                                            <div className="d-flex align-items-center mt-2">
                                                <div className="me-4 comment-action">
                                                    <i className="far fa-thumbs-up me-1" />
                                                    <span>2</span>
                                                </div>
                                                <div className="me-4 comment-action">
                                                    <i className="far fa-comment-dots me-1" />
                                                    <span>Trả lời</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Nested Comment 3 */}
                                    <div className="d-flex">
                                        <div className="me-3">
                                            <img
                                                src="/api/placeholder/36/36"
                                                alt="User"
                                                className="comment-avatar"
                                                style={{ width: 36, height: 36 }}
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <a href="#" className="comment-user">
                                                        Hai Le
                                                    </a>
                                                    <span className="ms-2 text-muted">@haile</span>
                                                </div>
                                                <span className="comment-time">
                                                    2025-05-11T09:20:18.789Z
                                                </span>
                                            </div>
                                            <p className="comment-body">Đề tài của bạn hay quá</p>
                                            <div className="d-flex align-items-center mt-2">
                                                <div className="me-4 comment-action">
                                                    <i className="far fa-thumbs-up me-1" />
                                                    <span>3</span>
                                                </div>
                                                <div className="me-4 comment-action">
                                                    <i className="far fa-comment-dots me-1" />
                                                    <span>Trả lời</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="comment-divider" />
                    {/* Comment 3 with nested replies */}
                    <div className="d-flex mb-3">
                        <div className="me-3">
                            <img
                                src="/api/placeholder/48/48"
                                alt="PHU NGUYEN"
                                className="comment-avatar"
                            />
                        </div>
                        <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <a href="#" className="comment-user">
                                        PHU NGUYEN
                                    </a>
                                    <span className="ms-2 text-muted">@toicodon</span>
                                </div>
                                <span className="comment-time">2025-05-11T07:34:39.528Z</span>
                            </div>
                            <p className="comment-body">
                                <a href="#" className="comment-mention">
                                    @donghainam
                                </a>{" "}
                                tra loi
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
                                <div className="comment-action">
                                    <i className="far fa-flag" />
                                </div>
                            </div>
                            {/* Nested comments toggle button */}
                            <div className="mt-3">
                                <button
                                    className="btn btn-sm btn-light d-flex align-items-center"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#nestedComments2"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-chevron-down me-2" />
                                    <span>Xem 2 câu trả lời</span>
                                </button>
                            </div>
                            {/* Nested comments */}
                            <div className="collapse mt-3" id="nestedComments2">
                                <div className="ps-4 border-start border-2 ms-2">
                                    {/* Nested Comment 1 */}
                                    <div className="d-flex mb-3">
                                        <div className="me-3">
                                            <img
                                                src="/api/placeholder/36/36"
                                                alt="User"
                                                className="comment-avatar"
                                                style={{ width: 36, height: 36 }}
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <a href="#" className="comment-user">
                                                        Fuu Nguyen
                                                    </a>
                                                    <span className="ms-2 text-muted">@donghainam</span>
                                                </div>
                                                <span className="comment-time">
                                                    2025-05-11T07:45:22.528Z
                                                </span>
                                            </div>
                                            <p className="comment-body">
                                                <a href="#" className="comment-mention">
                                                    @toicodon
                                                </a>{" "}
                                                Cảm ơn bạn đã phản hồi
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
                                    {/* Nested Comment 2 */}
                                    <div className="d-flex">
                                        <div className="me-3">
                                            <img
                                                src="/api/placeholder/36/36"
                                                alt="User"
                                                className="comment-avatar"
                                                style={{ width: 36, height: 36 }}
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <a href="#" className="comment-user">
                                                        PHU NGUYEN
                                                    </a>
                                                    <span className="ms-2 text-muted">@toicodon</span>
                                                </div>
                                                <span className="comment-time">
                                                    2025-05-11T08:02:44.789Z
                                                </span>
                                            </div>
                                            <p className="comment-body">
                                                <a href="#" className="comment-mention">
                                                    @donghainam
                                                </a>{" "}
                                                Không có gì. Khi nào nộp nhớ gửi tôi nhé!
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}