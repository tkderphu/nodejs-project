import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchBookmarkAction } from "../../redux/store/action/bookmark/bookmark.action"

function Bookmark() {
    const {userId} = useParams()
    const bookmarkState: {
        loading: boolean,
        hasError: boolean,
        error: any,
        bookmarks: {

        }
    } = useSelector((state: any) => {
        return state.fetchBookmark
    })


    const dispatch = useDispatch()

    useEffect(() => {
        //@ts-ignore
        dispatch(fetchBookmarkAction(userId))
    }, [])

    return <div></div>
}
export default Bookmark