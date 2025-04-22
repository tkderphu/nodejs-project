import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Comment, CommentReqVO } from "../../model/Comment";
import { UserProfile } from "../../model/User";
import { createCommentAction } from "../../redux/store/action/comment/comment.action";
import AlertConponent from "../common/AlertComponent";
import Modal from "../common/Modal";
import ModalComponent from "../common/modal/ModalComponent";
import Gallery from "../gallery/Gallery";
export default function FormCommentComponent(props: {
    reply?: Comment,
    closeForm?: any
}) {
    const postId = useParams().id
    const [openModal, setOpenModal] = useState(false)
    const [images, setImages] = useState<Set<any>>(new Set<any>())
    const [content, setContent] = useState()

    const dispatch = useDispatch()
    const {
        loading,
        hasError,
        error
    } = useSelector((state: any) => {
        return state.createComment
    })

    const handleSubmit = () => {
        const req: CommentReqVO = {
            content: content,
            imageUrls: Array.from(images),
            postId: postId,
            replyCommentId: props.reply?._id,
            rootCommentId: (props.reply?.rootCommentId ? props.reply.rootCommentId : props.reply?._id)
        }
        console.log("req: ", req)
        //@ts-ignore
        dispatch(createCommentAction(req))
    }
    return (
        <div className="card mb-3 mt-2">
            <div className="d-flex align-items-center">
                {props.reply?.user?.nickname && (<div className="me-2  border rounded p-3 text-primary">@{props.reply.user.nickname}</div>)}
                <input
                    type="text"
                    className="form-control p-3"
                    style={{ fontSize: "16px" }}
                    value={content}
                    onChange={(e: any) => setContent(e.target.value)}
                />
            </div>
            {/* <input className="form-control" name='content' value={content} /> */}
            {
                images.size > 0 && (
                    <div className="mt-3">
                        {Array.from(images).map((image) => {
                            return <>
                                <div className="position-relative d-inline-block mx-3" style={{ width: '50px', height: '50px' }}>
                                    <img
                                        src={image}
                                        alt="avatar"
                                        className="rounded w-100 h-100"
                                    />
                                    <span
                                        onClick={() => {
                                            images.delete(image)
                                            setImages(new Set(images))
                                        }}
                                        className="position-absolute top-0 start-100 translate-middle badge bg-light text-danger rounded-circle p-1"
                                        style={{

                                            fontSize: '1rem',
                                            cursor: 'pointer',
                                            transform: 'translate(-50%, 50%)' // move it *inside* the image
                                        }}
                                    >
                                        &times;
                                    </span>
                                </div>


                            </>

                        })}
                    </div>
                )
            }
            <button className="btn btn-secondary mt-3 w-100" onClick={() => setOpenModal(true)}>Chọn ảnh</button>
            <ModalComponent
                onClose={() => setOpenModal(false)}
                show={openModal}
                title="Ảnh của tôi"
            >
                <Gallery chooseMultiple={true} saveImageCallback={(img: any) => {
                    const newSet = new Set<any>(images)
                    newSet.add(img)
                    setImages(newSet)
                }} />
            </ModalComponent>
            <AlertConponent loading={loading} hasError={hasError} error={error}/>
            <button className="btn btn-primary mt-3 w-100" onClick={() => {
                handleSubmit()
            }}>Bình luận</button>
            {props.reply && (
                <span
                    onClick={() => {
                        props.closeForm(props.reply?._id)
                    }}
                    className="position-absolute top-0 start-100 translate-middle badge bg-light text-danger rounded-circle p-1"
                    style={{

                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        transform: 'translate(-50%, 50%)' // move it *inside* the image
                    }}
                >
                    &times;
                </span>
            )}
        </div >
    )
}