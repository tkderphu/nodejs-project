import { stat } from "fs"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateProfileSocialAction } from "../../redux/store/action/profile/profile.action"
import { getUserLoggined } from "../../service/AuthenLoginResponse"
import AlertConponent from "../common/AlertComponent"
import ModalComponent from "../common/modal/ModalComponent"
import Profile from "./Profile"

export default function ProfileEmbedded(props: {
    socialPlatform?: {
        instagram?: any,
        twitter?: any,
        github?: any,
        yoursite?: any,
        linkedln?: any
    }
}) {

    const [req, setReq] = useState({
        instagram: props.socialPlatform?.instagram || '',
        twitter: props.socialPlatform?.twitter || '',
        github: props.socialPlatform?.github || '',
        linkedln: props.socialPlatform?.linkedln || '',
        yoursite: props.socialPlatform?.yoursite || ''
    })
    const { loading, hasError, error } = useSelector((state: any) => {
        return state.updateProfileSocial
    })
    const dispatch = useDispatch()
    const onChange = (e: any) => {
        const { name, value } = e.target
        setReq((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const [modalOpen, setModalOpen] = useState(false);

    const handleSave = () => {
        console.log("props: ", props.socialPlatform)
        //@ts-ignore
        dispatch(updateProfileSocialAction(getUserLoggined()._id, req))
    };


    useEffect(() => {
        console.log("props: ", props.socialPlatform)
    }, [])


    return (
        <>
            <div>
                <button onClick={() => {
                    setModalOpen(true)
                    console.log("props: ", props.socialPlatform)

                }} className='btn btn-primary w-100 mb-0'>Nhúng trang cá nhân</button>

                <ModalComponent
                    show={modalOpen}
                    title="Mạng xã hội"
                    onClose={() => setModalOpen(false)}
                    onSave={handleSave}
                >
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="github" name='github' value={req.github} onChange={(e) => onChange(e)} placeholder="https://github.com/..." />
                        <label htmlFor="github">Github</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="instagram" name='instagram' value={req.instagram} onChange={onChange} placeholder="https://instagram.com/..." />
                        <label htmlFor="instagram">Instagram</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="twitterId" name='twitter' value={req.twitter} onChange={onChange} placeholder="https://twitter.com/..." />
                        <label htmlFor="twitterId">Twitter</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="linkedln" name="linkedln" value={req.linkedln} onChange={onChange} placeholder="https://linkedln.com/..." />
                        <label htmlFor="linkedln">Linkedln</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="yourwebsite" name="yoursite" value={req.yoursite} onChange={onChange} placeholder="https://yourwebsite/..." />
                        <label htmlFor="yourwebsite">Website của bạn</label>
                    </div>

                </ModalComponent>
            </div>
        </>
    )
}