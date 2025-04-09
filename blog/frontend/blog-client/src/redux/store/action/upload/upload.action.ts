import uploadService from "../../../../service/upload.service"
import { fetchGalleriesAction } from "../gallery/gallery.action"
import { UPLOAD_BEGIN, UPLOAD_FAILED, UPLOAD_SUCCESS } from "./upload.type"

export const uploadAction = (formData: FormData) => {
    return (dispatch: any) => {
        dispatch({
            type: UPLOAD_BEGIN
        })
        uploadService.upload(formData).then(resp => {
            dispatch({
                type: UPLOAD_SUCCESS
            })
            dispatch(fetchGalleriesAction())
        }).catch(err => {
            console.log("vcl")
            dispatch({
                type: UPLOAD_FAILED,
                payload: err
            })
        })
    }
}