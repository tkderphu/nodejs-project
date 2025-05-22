import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSettingAction, updateSettingNotifyAction } from "../../redux/store/action/setting/setting.action"
import { Setting, SettingNotify } from "../../service/setting.service"
import FullScreenLoader from "../common/fullspinner/FullScreenLoader"

export default function SettingNotifyComponent() {


    const { loading } = useSelector((state: any) => {
        return state.updateSettingNotify
    })
    const fetchSettingState: {
        setting: Setting,
        loading: boolean
    } = useSelector((state: any) => {
        return state.fetchSetting
    })

    const dispatch = useDispatch()
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchSettingAction())
    }, [loading])


    const [req, setReq] = useState<SettingNotify>({
        ...fetchSettingState.setting?.notification
    })

    useEffect(() => {
        setReq(fetchSettingState.setting?.notification)
    }, [fetchSettingState])

    const onChangeSetting = (e: any) => {
        const { name, checked } = e.target
        setReq((prev) => ({
            ...prev,
            [name]: checked
        }))
    }

    const handleSubmit = () => {
        //@ts-ignore
        dispatch(updateSettingNotifyAction(req))
    }

    console.log("fetchSetting: ", fetchSettingState)


    return (
        <>
            {loading && <FullScreenLoader/>}
            <div
                className="tab-pane fade show active"
                id="notifications-tab-pane"
                role="tabpanel"
                aria-labelledby="notifications-tab"
                tabIndex={0}
            >
                <div className="alert-box bg-primary bg-opacity-10 text-primary">
                    <i className="bi bi-info-circle" />
                    <div>
                        <strong>Why manage notifications?</strong>
                        <p className="mb-0">
                            Keep yourself updated with important activities while avoiding
                            notification overload.
                        </p>
                    </div>
                </div>

                <div className="mb-4">
                    <h5 className="mb-3">Thông báo</h5>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <div>
                            <label className="form-check-label">
                                Cho phép thông báo từ người đang theo dõi
                            </label>
                            <p className="text-muted small mb-0">
                                Nhận được thông báo khi người mà bạn theo dõi đăng bài viết mới.
                            </p>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="pushNotif"
                                checked={req?.fromFollowing}
                                name="fromFollowing"
                                onChange={onChangeSetting}
                            />
                        </div>
                    </div>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <div>
                            <label className="form-check-label">
                                Cho phép thông báo khi tương tác bình luận
                            </label>
                            <p className="text-muted small mb-0">
                                Nhận được thông báo người nào đó bình luận vào bài viết hoặc trả lời bình luận của bạn.
                            </p>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="pushNotif"
                                checked={req?.fromCommentInteraction}
                                name="fromCommentInteraction"
                                onChange={onChangeSetting}
                            />
                        </div>
                    </div>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <div>
                            <label className="form-check-label">
                                Cho phép thông báo khi thích bài viết,  bình luận
                            </label>
                            <p className="text-muted small mb-0">
                                Nhận được thông báo người nào đó thích bình luận, bài viết.
                            </p>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="pushNotif"
                                checked={req?.fromLikeInteraction}
                                name="fromLikeInteraction"
                                onChange={onChangeSetting}
                            />
                        </div>
                    </div>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <div>
                            <label className="form-check-label">
                                Cho phép thông báo đẩy
                            </label>
                            <p className="text-muted small mb-0">
                                Nhận được thông báo ngay cả khi bạn không sử dụng ứng dụng.
                            </p>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="pushNotif"
                                checked={req?.allowPushNotifyMessage}
                                name="allowPushNotifyMessage"
                                onChange={onChangeSetting}
                            />
                        </div>
                    </div>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <div>
                            <label className="form-check-label">Âm thanh thông báo</label>
                            <p className="text-muted small mb-0">
                                Bật tiếng khi có thông báo đến
                            </p>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="soundNotif"
                                checked={req?.allowNotifySound}
                                name="allowNotifySound"
                                onChange={onChangeSetting}
                            />
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                    <button type="button" className="btn btn-outline-secondary me-2">
                        Hủy
                    </button>
                    <button type="button" onClick={handleSubmit} className="btn btn-primary">
                        Lưu
                    </button>
                </div>
            </div>
        </>
    )
}