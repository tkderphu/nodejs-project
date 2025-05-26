import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPaymentUrlAction, fetchFlowerAction } from "../../redux/store/action/transaction/transaction.action";
import { getUserLoggined } from "../../service/AuthenLoginResponse";
import { Flower } from "../../service/flower.service";
import socket from "../../socket/socket";
import AlertConponent from "../common/AlertComponent";
import FullScreenLoader from "../common/fullspinner/FullScreenLoader";
import ModalComponent from "../common/modal/ModalComponent";
import Transaction from "./transaction/Transaction";

export default function ProfileFlower(props: { userId?: string }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalPersonalImagesOpen, setModalPersonalImagesOpen] = useState(false);



    const fetchFlowerState: {
        loading: boolean,
        error: any,
        hasError: boolean,
        flower: Flower
    } = useSelector((state: any) => {
        return state.fetchFlower
    })

    useEffect(() => {
        if (getUserLoggined()._id) {
            //@ts-ignore
            dispatch(fetchFlowerAction())
            socket.on(`topic_payment_user_${getUserLoggined()._id}`, (data) => {
                //@ts-ignore
                dispatch(fetchFlowerAction())
                setModalPersonalImagesOpen(false)
            });

            return () => {
                socket.off(`topic_payment_user_${getUserLoggined()._id}`);
            };
        }
    }, [getUserLoggined()._id])


    const createPaymentUrlState: {
        loading: boolean,
        hasError: boolean,
        error: any
    } = useSelector((state: any) => {
        return state.createPaymentUrl
    })

    const dispatch = useDispatch()
    const [amount, setAmount] = useState(10000)

    const handlePayment = () => {
        if (amount < 10000) {
            alert("Số lượng phải lớn hơn 10.000")
            return;
        }
        //@ts-ignore
        dispatch(createPaymentUrlAction(amount))
    }


    const [openHistoryTransaction, setOpenHistoryTransaction] = useState(false)


    return (
        <>
            {/* {fetchFlowerState.loading && <FullScreenLoader/>} */}
            <button onClick={() => {
                setModalOpen(true)

            }} className="btn btn-secondary">Hoa</button>

            <ModalComponent
                show={modalOpen}
                title="Hoa"
                onClose={() => setModalOpen(false)}
            >

                <div className="form-floating mb-3 text-start">
                    Số lượng hoa: <strong>{(fetchFlowerState.flower?.numberFlower || 0).toLocaleString()}</strong>
                </div>
                <div className="form-floating mb-3">
                    <div className="d-flex justify-content-between">
                        <button onClick={() => {
                            setOpenHistoryTransaction(true)

                        }} className='btn btn-danger '>Lịch sử giao dịch</button>
                        <button onClick={() => {
                            setModalPersonalImagesOpen(true)

                        }} className='btn btn-primary '>Nạp hoa</button>

                    </div>
                    <ModalComponent
                        show={openHistoryTransaction}
                        title="Lịch sử giao dịch"
                        closable={false}
                        large={true}
                        onClose={() => setOpenHistoryTransaction(false)}
                    >
                        
                        <Transaction/>
                        
                    </ModalComponent>


                    <ModalComponent
                        show={modalPersonalImagesOpen}
                        title="Nạp hoa"
                        closable={false}
                        onClose={() => setModalPersonalImagesOpen(false)}
                    >
                        <div className="form-group mb-3">
                            <label htmlFor="exampleInputEmail1" className="mb-1">Số lượng hoa cần nạp(phải lớn hơn 10.000)</label>
                            <input type="number" value={amount} onChange={(e) => {
                                //@ts-ignore
                                setAmount(e.target.value)
                            }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nhập số lượng hoa cần nạp" />
                        </div>
                        {createPaymentUrlState.loading && <FullScreenLoader />}
                        <button type="submit" className="btn btn-primary w-100" disabled={createPaymentUrlState.loading} onClick={() => {
                            handlePayment()
                        }}>Nạp</button>
                    </ModalComponent>
                </div>
                {/* <AlertConponent loading={loading} hasError={hasError} error={error} /> */}

            </ModalComponent>
        </>
    )
}