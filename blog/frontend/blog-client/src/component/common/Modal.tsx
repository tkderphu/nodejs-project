function Modal(props: {dataTarget: string}) {
    return (
        <div className={`modal fade ${props.dataTarget}`} tabIndex={1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    ...
                </div>
            </div>
        </div>
    )
}
export default Modal