import { useState } from "react";
import ModalComponent from "./modal/ModalComponent";

export default function ReportButtonComponent() {
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <button className={`btn btn-light mb-3`} onClick={() => setOpenModal(true)} >
                <i className="fa fa-flag" ></i>
            </button>
            <ModalComponent
                show={openModal}
                title={"Tố cáo"}
                onClose={() => setOpenModal(false)}
            >
                <div className="form-group text-start">
                    <label htmlFor="exampleFormControlInput1">Lý do tố cáo tố cáo</label>
                    <textarea className="form-control" id="exampleFormControlInput1" placeholder="Lý do: ít nhất 10 ký tự">

                    </textarea>
                </div>
            </ModalComponent>
        </>
    )
}