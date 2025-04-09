import galleryService from "../../../../service/gallery.service"
import { FETCH_GALLERIES_BEGIN, FETCH_GALLERIES_FAILED, FETCH_GALLERIES_SUCCESS } from "./gallery.action.type"


export const fetchGalleriesAction = () => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_GALLERIES_BEGIN
        })
        galleryService.getListGallery().then(res => {
            console.log("galleries: ", res.data)
            dispatch({
                type: FETCH_GALLERIES_SUCCESS,
                payload: res.data
            })

        }).catch(err => {
            dispatch({
                type: FETCH_GALLERIES_FAILED,
                payload: err
            })
        })
    }
}