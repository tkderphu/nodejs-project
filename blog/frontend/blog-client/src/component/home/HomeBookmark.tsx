import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Post } from "../../model/Post"
import { fetchBookmarkAction } from "../../redux/store/action/bookmark/bookmark.action"
import { getUserLoggined } from "../../service/AuthenLoginResponse"
import FullScreenLoader from "../common/fullspinner/FullScreenLoader"
import PostSimpleComponent from "../post/PostSimpleComponent"

export default function HomeBookmark() {

    const bookmarkState: {
        loading: boolean,
        error: any,
        bookmarks: {
            post: Post
        }[]
    } = useSelector((state: any) => {
        return state.fetchBookmark;
    })
    const [useMode, setUseMode] = useState<"POST" | "SERIES">("POST")

    console.log("bookmark: ", bookmarkState.bookmarks)

    const dispatch = useDispatch()
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchBookmarkAction(getUserLoggined()._id, useMode))
    }, [useMode])
    if (bookmarkState.loading) {
        return <FullScreenLoader />
    }
    return (
        <>
            <div className="d-flex justify-content-end">
                <button className={`btn active-btn mx-3 ${useMode === 'POST' ? "btn-active" : ""}`}
                    data-toggle="tooltip" data-placement="top" title="Bài viết"
                    onClick={() => {
                        setUseMode("POST")
                    }}>
                    Bài viết
                </button>
                <button className={`btn active-btn ${useMode === 'SERIES' ? "btn-active" : ""}`}
                    data-toggle="tooltip" data-placement="top" title="Series"
                    onClick={() => {
                        setUseMode("SERIES")
                    }}>
                    Series
                </button>
            </div>
            {bookmarkState.bookmarks?.map((bookmark, idx) => (
                <PostSimpleComponent showPreview={false}  post={bookmark.post}/>
            ))}
        </>
    )
}