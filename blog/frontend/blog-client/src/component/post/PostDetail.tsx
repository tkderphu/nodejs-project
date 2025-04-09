import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Post } from "../../model/Post"
import { fetchAllPostAction, fetchPostAction } from "../../redux/store/action/post/post.action"
import AlertConponent from "../common/AlertComponent"
import Modal from "../common/Modal"
import Gallery from "../gallery/Gallery"
import PostSimple from "./PostSimple"

function PostDetail() {
    const { id } = useParams()
    const [openModal, setOpenModal] = useState(false)
    const postState: {
        post: Post,
        loading: boolean,
        hasError: boolean,
        error: any
    } = useSelector((state: any) => {
        return state.fetchPost
    })
    const dispatch = useDispatch()
    // const memoizedGallery = useMemo(() => <Gallery />, []);

    useEffect(() => {
        
        //@ts-ignore
        dispatch(fetchPostAction(id))
    }, [])

    if (postState.loading || postState.hasError) {
        return <AlertConponent error={postState.error} loading={postState.loading} hasError={postState.hasError} />
    }
    return (
        <>

            {postState.post && (<div className="container">
                <div className="row">
                    <div >
                        <div className="card mt-3 mb-3">
                            <PostSimple post={postState.post} />
                        </div>


                        <div dangerouslySetInnerHTML={{
                            __html: `${postState.post.content}`
                        }}>


                        </div>
                    </div>
                </div>
                <div >
                    <div className="row"><input className="w-100 p-3" type={"text"} placeholder="Viết bình luận" /></div>
                    <div>
                        <button className="btn btn-outline-primary p-3 w-100 mt-3 mb-3 edit-btn" 
                        type="button" data-toggle="modal" data-target='.choose-image' onClick={() => {
                            setOpenModal(true)
                        }}>Thêm hình ảnh</button>
                        <Modal dataTarget="choose-image" component={ 
                            <Gallery/>
                        }  open={openModal}/>

                    </div>
                    <div className="row"><button className="w-100 p-3">Bình luận</button></div>

                </div>
            </div>)}
        </>
    )
}

export default PostDetail