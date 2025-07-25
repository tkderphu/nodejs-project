import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { Post } from "../../model/Post";
import { checkBookmarkedAction, popPostFromBookmarkedAction, pushPostToBookmarkedAction } from "../../redux/store/action/bookmark/bookmark.action";
import { checkLikeAction, likeAction, unlikeAction } from "../../redux/store/action/like/like.action";
import { fetchPostAction, fetchUnlockPostAction, unlockPostAction } from "../../redux/store/action/post/post.action";
import { reportAction } from "../../redux/store/action/report/report.action";
import { getUserLoggined } from "../../service/AuthenLoginResponse";
import likeService from "../../service/like.service";
import { ReportReq } from "../../service/report.service";
import { estimateReadingTime, formatDate } from "../../utils/utils";
import CommentComponent1 from "../comment/CommentComponent1";
import AlertConponent from "../common/AlertComponent";
import FullScreenLoader from "../common/fullspinner/FullScreenLoader";
import ModalComponent from "../common/modal/ModalComponent";
import ReportButtonComponent from "../common/ReportButtonComponent";
import "./Post.css"
export default function PostVeryDetails() {

    const { id } = useParams()
    const postState: {
        loading: boolean,
        hasError: boolean,
        error: any,
        post: Post
    } = useSelector((state: any) => {
        return state.fetchPost
    })
    const dispatch = useDispatch()
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchPostAction(id))
    }, [id])

    const fetchUnlockState: {
        loading: boolean,
        unlock: boolean
    } = useSelector((state: any) => {
        return state.fetchPostUnlock
    })




    const [headings, setHeadings] = useState<any>([]);

    document.title = postState.post?.title || ""


    useEffect(() => {
        //@ts-ignore
        dispatch(fetchUnlockPostAction(id))
    }, [postState])

    useEffect(() => {
        showTableContent()
    }, [postState])

    const showContentAll = () => {
        const rawHtml = showContent() || "";
        const parser = new DOMParser();
        const doc = parser.parseFromString(rawHtml, 'text/html');

        const headers = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headers.forEach((header, index) => {
            header.id = `header-${index + 1}`;
        });

        return doc.body.innerHTML;
    }

    const showTableContent = () => {
        if (!postState.post?.content) return <></>
        const rawHtml = postState.post?.content || "";
        const parser = new DOMParser();
        const doc = parser.parseFromString(rawHtml, 'text/html');

        const headers = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headers.forEach((header, index) => {
            header.id = `header-${index + 1}`;
        });
        const collected: any = []
        headers.forEach((header: any, index: any) => {
            const text = header.textContent.trim();
            const id = `header-${index + 1}`;
            header.id = id;
            collected.push({
                id,
                text,
                level: parseInt(header.tagName[1]),
            });
        });

        setHeadings(collected);
    }


    const showContent = () => {
        if (postState.post?.user?._id === getUserLoggined()?._id) return postState.post?.content
        if (postState.post?.needUnlock && !fetchUnlockState?.unlock) {
            //@ts-ignore
            return postState.post?.content?.substring(0, Number.parseInt(((postState.post?.showContentPercent / 100) * postState.post?.content.length) + "")) + ".........";
        }
        return postState.post?.content;
    }


    const unlockPostState: {
        hasError: boolean,
        loading: boolean,
        message: any
    } = useSelector((state: any) => {
        return state.unlockPost
    })



    const checkBookmarkState: {
        status: any
    } = useSelector((state: any) => {
        return state.checkBookmarked
    })



    const statePushBookmark: {
        loading: boolean
    } = useSelector((state: any) => {
        return state.pushPostToBookmark
    })
    const statePopBookmark: {
        loading: boolean
    } = useSelector((state: any) => {
        return state.popPostFromBookmark
    })

    const stateLikePost: {
        loading: boolean
    } = useSelector((state: any) => {
        return state.like
    })

    const stateUnlikePost: {
        loading: boolean
    } = useSelector((state: any) => {
        return state.unlike
    })

    const stateCheckLikePost: {
        success: boolean
    } = useSelector((state: any) => {
        return state.checkLike
    })

    useEffect(() => {
        //@ts-ignore
        dispatch(checkBookmarkedAction(getUserLoggined()._id, id, "POST"))
        //@ts-ignore
        dispatch(checkLikeAction(getUserLoggined()._id, id, "POST"))
    }, [postState])




    const handleLike = () => {
        if (stateCheckLikePost.success) {
            //@ts-ignore
            dispatch(unlikeAction(id, "POST"))
        } else {
            //@ts-ignore
            dispatch(likeAction(id, "POST"))
        }
    }
    //for reporting
    const [openModal, setOpenModal] = useState(false)
    const [reasonReport, setReasonReport] = useState<string>("")
    const reportState: {
        loading: boolean
    } = useSelector((state: any) => {
        return state.report
    })

    useEffect(() => {
        if(reportState.loading) {
            setOpenModal(false)
        }
    }, [reportState])

    return (
        <>
            {(statePushBookmark.loading || fetchUnlockState.loading || postState.loading || statePopBookmark.loading) && (
                <FullScreenLoader />
            )}
            <div className="container mt-5 row">
                <div className="col-md-1 d-none d-md-block">
                    <div className="position-sticky" style={{ top: "100px" }}>
                        <div className="text-center">
                            <button className={"btn btn-light mb-3 " + (stateCheckLikePost.success ? "active" : "")}
                                onClick={handleLike}
                            ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                </svg>                        <div>{postState.post?.like || 0}</div></button>
                            {/* <button className="btn btn-light mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                                <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a9 9 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581s-.027-.414-.075-.581c-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.2 2.2 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.9.9 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1" />
                            </svg><div>0</div></button> */}
                            <button className={"btn btn-light mb-3 " + (checkBookmarkState.status ? "active" : "")} onClick={() => {
                                if (checkBookmarkState.status) {
                                    //@ts-ignore
                                    dispatch(popPostFromBookmarkedAction(id, "POST"))
                                    console.log("vai ca lon satatus: ", checkBookmarkState.status)

                                } else {
                                    //@ts-ignore
                                    dispatch(pushPostToBookmarkedAction(id, "POST"))
                                }
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
                                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                                </svg>
                                <div>{postState.post?.bookmark}</div>
                            </button>
                            <button className={`btn btn-light mb-3`} onClick={() => setOpenModal(true)} >
                                <i className="fa fa-flag" ></i>

                            </button>

                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center mb-3">
                            <img
                                src={postState.post?.user?.image_url}
                                alt="Avatar"
                                className="rounded-circle"
                                width="50"
                                height="50"
                            />
                            <div className="ms-3 d-flex justify-content-between">
                                <div>
                                    <Link to={`/profile/${postState.post?.user?._id}`} style={{
                                        textDecoration: "none"
                                    }}><strong>{postState.post?.user?.fullName}</strong></Link>
                                    <button className="btn btn-sm btn-outline-secondary ms-auto">Follow</button>
                                    <br />
                                    <div className="d-flex justify-content-around">
                                        <small className="text-muted d-flex align-items-center" style={{ fontSize: "18px" }}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                        </svg><span>24</span></small>
                                        <small className="text-muted d-flex align-items-center" style={{ fontSize: "18px" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                            </svg>
                                            <span>128</span>
                                        </small>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* <div>
                            <button className="btn btn-light" onClick={handleAutoSpeak}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-.214c-2.162-1.241-4.49-1.843-6.912-2.083l.405 2.712A1 1 0 0 1 5.51 15.1h-.548a1 1 0 0 1-.916-.599l-1.85-3.49-.202-.003A2.014 2.014 0 0 1 0 9V7a2.02 2.02 0 0 1 1.992-2.013 75 75 0 0 0 2.483-.075c3.043-.154 6.148-.849 8.525-2.199zm1 0v11a.5.5 0 0 0 1 0v-11a.5.5 0 0 0-1 0m-1 1.35c-2.344 1.205-5.209 1.842-8 2.033v4.233q.27.015.537.036c2.568.189 5.093.744 7.463 1.993zm-9 6.215v-4.13a95 95 0 0 1-1.992.052A1.02 1.02 0 0 0 1 7v2c0 .55.448 1.002 1.006 1.009A61 61 0 0 1 4 10.065m-.657.975 1.609 3.037.01.024h.548l-.002-.014-.443-2.966a68 68 0 0 0-1.722-.082z" />
                                </svg>
                            </button>
                        </div> */}
                        <div>
                            <div className="text-muted mb-2" style={{ position: "relative", right: 0 }}>
                                Đăng {formatDate(postState.post?.timestamps?.createdAt)} - {estimateReadingTime(postState.post?.content || "", 1000)} phút đọc
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                </svg> 27
                                💬 {postState.post?.comment}
                            </div>
                        </div>
                    </div>
                    <h1 className="fw-bold">{postState.post?.title}</h1>

                    <div
                        id="content"
                        dangerouslySetInnerHTML={{
                            __html: showContentAll()
                        }}>
                    </div>
                    {!fetchUnlockState.unlock && postState.post?.needUnlock && postState.post.user?._id !== getUserLoggined()._id && (
                        <>
                            <AlertConponent loading={unlockPostState.loading} error={unlockPostState.message} hasError={unlockPostState.hasError} />
                            <button className="btn btn-primary " onClick={() => {
                                //@ts-ignore
                                dispatch(unlockPostAction(id))
                            }}>Đọc tiếp bài viết với {postState.post?.numberFlower} hoa</button>
                        </>
                    )}

                </div>

                <div className="col-md-3 ">
                    <div className="position-sticky" style={{ top: "20px" }}>
                        <h5 className="text-muted">Bảng nội dung</h5>
                        <ul className="list-unstyled ps-3">
                            {headings.map((h: any, i: any) => (
                                <li key={i} className='text-start' style={{ marginLeft: `${(h.level - 1) * 10}px` }}>
                                    <Link style={{ textDecoration: "none" }} to={`#${h.id}`}>{h.text}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

            </div>
            {/*for reporting*/}
            <ModalComponent
                show={openModal}
                title={"Tố cáo"}
                onClose={() => setOpenModal(false)}
                onSave={() => {
                    const obj: ReportReq = {
                        type: "POST",
                        typeId: id,
                        reason: reasonReport
                    }
                    //@ts-ignore
                    dispatch(reportAction(obj))
                }}
            >
                {reportState.loading && (<FullScreenLoader/>)}
                <div className="form-group text-start">
                    <label htmlFor="exampleFormControlInput1">Lý do tố cáo tố cáo</label>
                    <textarea className="form-control mt-2" value={reasonReport} onChange={(e: any) => {
                        setReasonReport(e.target.value)
                    }} id="exampleFormControlInput1" placeholder="Lý do: ít nhất 10 ký tự">

                    </textarea>
                </div>
            </ModalComponent>
            <CommentComponent1 />
        </>
    );
};
