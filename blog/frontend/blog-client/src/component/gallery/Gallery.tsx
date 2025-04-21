import { stat } from "fs"
import { memo, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGalleriesAction } from "../../redux/store/action/gallery/gallery.action"
import { uploadAction } from "../../redux/store/action/upload/upload.action"
import uploadService from "../../service/upload.service"
import AlertConponent from "../common/AlertComponent"

interface Gallery {
    _id?: string
    userId?: string
    imageUrl?: string
}
function Gallery(props: {chooseMultiple: boolean, saveImageCallback: any}) {
    const galleryState: {
        galleries: Gallery[],
        loading: boolean,
        error: any,
        hasError: boolean
    } = useSelector((state: any) => {
        return state.fetchGalleries
    })

    // const [uploadState, setUploadState] = useState<{
    //     loading?: boolean,
    //     hasError?: boolean,
    //     error?: any
    // }>({
    // })
    const uploadState: {
        loading?: boolean,
        hasError?: boolean,
        error?: any
    } = useSelector((state: any) => {
        return state.upload
    })
    const dispatch = useDispatch()
    useEffect(() => {
        console.log('get galleries')
        //@ts-ignore
        dispatch(fetchGalleriesAction())

    }, [])


    const uploadImage = () => {
        //@ts-ignore
        const file = document.getElementById('file').files[0]
        const formData = new FormData();
        formData.append('file', file);
        //@ts-ignore
        dispatch(uploadAction(formData))
        //     document.body.style.overflow = 'auto';
        //    setUploadState({loading: true})
        //     uploadService.upload(formData).then(res => {
        //     setUploadState({
        //         loading: false
        //     })
        //    }).catch(err => {
        //     setUploadState({
        //         loading: false,
        //         hasError: true,
        //         error: err
        //     })
        //    })

    }
    return (
        <div>
            <div className="d-flex flex-wrap">
                {galleryState.galleries && galleryState.galleries.map((gallery, index) => {
                    return (
                        <div className="form-check form-check-inline d-flex align-items-center mb-3">
                            <input className="form-check-input" onChange={(e) => {
                                props.saveImageCallback(e.target.value)
                            }}  type={props.chooseMultiple ? "checkbox" : "radio"} id={"inlineCheckbox" + index} name={props.chooseMultiple ? "galleryImage" + index : "galleryImage" }  value={gallery.imageUrl} />
                            <label className="form-check-label" htmlFor={"inlineCheckbox" + index}>
                                <img
                                    width={"100px"} height="100px" className="mx-3"
                                    src={gallery.imageUrl} />
                            </label>
                        </div>
                    )
                })}

            </div>
            <div className="mb-3">
                <label htmlFor="file" className="form-label">Upload file</label>
                <input className="form-control" type="file" id="file" />
                {/* {uploadState && uploadState.error} */}
                <AlertConponent error={uploadState.error} hasError={uploadState?.hasError} loading={uploadState?.loading} />
                <AlertConponent error={galleryState.error} hasError={galleryState?.hasError} loading={galleryState?.loading} />
                <button className="btn btn-primary w-100 mt-3" onClick={() => {
                    uploadImage()
                }}>Uploads</button>
            </div>
        </div>
    )
}
export default Gallery