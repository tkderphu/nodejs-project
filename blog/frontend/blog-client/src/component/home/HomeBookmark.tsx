import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBookmarkAction } from "../../redux/store/action/bookmark/bookmark.action"
import { getUserLoggined } from "../../service/AuthenLoginResponse"

export default function HomeBookmark() {

    const bookmarkState: {
        loading: boolean,
        error: any,
        bookmarks: []
    } = useSelector((state: any) => {
        return state.fetchBookmark;
    })
    const [useMode, setUseMode] = useState<"TITLE" | "PREVIEW">("TITLE")

    const dispatch = useDispatch()
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchBookmarkAction(getUserLoggined()._id, "POST"))
    }, [])

    return (
        <>
        <div className="d-flex justify-content-end">
                <button className={`btn active-btn mx-3 ${useMode === 'TITLE' ? "btn-active" : ""}`}
                    data-toggle="tooltip" data-placement="top" title="Bài viết"
                    onClick={() => {
                        setUseMode("TITLE")
                    }}>
                    Bài viết
                </button>
                <button className={`btn active-btn ${useMode === 'PREVIEW' ? "btn-active" : ""}`}
                    data-toggle="tooltip" data-placement="top" title="Series"
                    onClick={() => {
                        setUseMode("PREVIEW")
                    }}>
                    Series
                </button>
            </div>
        </>
    )
}