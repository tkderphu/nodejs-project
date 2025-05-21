import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Comment, CommentReqVO } from "../../model/Comment";
import { UserProfile } from "../../model/User";
import { createCommentAction } from "../../redux/store/action/comment/comment.action";
import AlertConponent from "../common/AlertComponent";
import FullScreenLoader from "../common/fullspinner/FullScreenLoader";
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
    const [content, setContent] = useState<string>('')

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
        setContent('')
        
    }
    
   
    return (
        <>

            {loading && <FullScreenLoader/>}
            <div className="comment-card mb-4">
                <div className="card-body p-4">
                    <textarea
                        className="form-control comment-input mb-3"
                        placeholder="Viết bình luận của bạn..."
                        defaultValue={content}
                        value={content}
                        onChange={(e:any) => setContent(e.target.value)}
                    />
                    <div className="d-flex justify-content-between mt-3">
                        <button className="btn comment-upload py-2 px-4" onClick={() => setOpenModal(true)}>
                            <i className="fas fa-image me-2" />
                            Chọn ảnh
                        </button>
                        <button className="btn comment-submit py-2 px-5" onClick={() => {
                            handleSubmit()
                        }}>Bình luận</button>
                    </div>
                </div>
            </div>
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

            {images.size > 0 && (
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
                                        transform: 'translate(-50%, 50%)'
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
        </>
    )
}