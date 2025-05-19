import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileUserInfoAction } from "../../redux/store/action/profile/profile.action";
import { getUserLoggined } from "../../service/AuthenLoginResponse";
import AlertConponent from "../common/AlertComponent";
import ModalComponent from "../common/modal/ModalComponent";
import Gallery from "../gallery/Gallery";

interface Info {
    fullName?: string
    image_url?: string
    bio?: string
    nickname?: string
}

export default function ProfileInfo(props: { info: Info }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalPersonalImagesOpen, setModalPersonalImagesOpen] = useState(false);
    const [req, setReq] = useState<Info>({
        bio: props.info?.bio,
        fullName: props.info?.fullName,
        image_url: props.info?.image_url,
        nickname: props.info?.nickname
    })
    const handleSave = () => {
        //@ts-ignore
        dispatch(updateProfileUserInfoAction(getUserLoggined()._id, req))
    };

    const { loading, hasError, error } = useSelector((state: any) => {
        return state.updateProfileInfoUser
    })

    const dispatch = useDispatch()
    const onChange = (e: any) => {
        const { name, value } = e.target
        setReq((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <div>
            <button onClick={() => {
                setModalOpen(true)

            }} className="btn btn-light">
                <i className="fas fa-edit me-1" />
                Cập nhật thông tin
            </button>

            <ModalComponent
                show={modalOpen}
                title="Thông tin cá nhân"
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
            >
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="fullNameInfo" name='fullName' value={req?.fullName} onChange={(e) => onChange(e)} placeholder="https://github.com/..." />
                    <label htmlFor="github">Họ và tên</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="nicknameInfo" name='nickname' value={req?.nickname} onChange={onChange} placeholder="https://instagram.com/..." />
                    <label htmlFor="instagram">Biệt danh</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="bioInfo" name='bio' value={req?.bio} onChange={onChange} placeholder="https://twitter.com/..." />
                    <label htmlFor="twitterId">Tiểu sử</label>
                </div>
                <div className="form-floating mb-3">
                    <label htmlFor="linkedln">Ảnh đại diện</label>
                    <img src={req.image_url} />
                </div>
                <div className="form-floating mb-3">
                    <button onClick={() => {
                        setModalPersonalImagesOpen(true)

                    }} className='btn btn-secondary w-100'>Chọn ảnh</button>

                    <ModalComponent
                        show={modalPersonalImagesOpen}
                        title="Danh sách ảnh cá nhân"
                        onClose={() => setModalPersonalImagesOpen(false)}
                    >
                        <Gallery chooseMultiple={false} saveImageCallback={
                            (imageUrl: any) => {
                                setReq((prev) => ({
                                    ...prev,
                                    ['image_url']: imageUrl
                                }))
                            }
                        } />
                    </ModalComponent>
                </div>
                {/* <AlertConponent loading={loading} hasError={hasError} error={error} /> */}

            </ModalComponent>
        </div>
    )
}