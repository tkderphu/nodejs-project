import { randomUUID } from 'crypto';
import React, { useState, useEffect } from 'react';
import { getUserLoggined } from '../../../service/AuthenLoginResponse';
import socket from '../../../socket/socket';
import PlayAudio from '../../../sound/PlayAudio';
import NotifyFollowTemplate from '../../notification/template/NotifyFollowTemplate';

const ToastApp: React.FC = () => {
    const [toasts, setToasts] = useState<any[]>([]);



    const addToast = (
        toast: any
    ): void => {
        const newToast: any = {
            id: Date.now() + Math.random(),
            toast: toast
        };

        setToasts(prev => [...prev, newToast]);

        // Auto remove after 5 seconds
        setTimeout(() => {
            removeToast(newToast.id);
        }, 10000);
    };

    const removeToast = (id: number): void => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };


    useEffect(() => {
        if (getUserLoggined()._id) {

            socket.on(`topic_notification_user_${getUserLoggined()._id}`, (data) => {
                const msg: {
                    _id: string,
                    createdAt: Date,
                    notifyType: "COMMENT" | "POST" | "FOLLOW" | "REPLY_COMMENT",
                    params: any,
                    userMessages: {
                        read: boolean
                    }
                } = data

                addToast(<NotifyFollowTemplate params={msg.params} read={msg.userMessages.read} time={"2w"} />)

            });

            return () => {
                socket.off(`topic_notification_user_${getUserLoggined()._id}`);
            };
        }
    }, [getUserLoggined()._id])


    return (
        <>
            <div className="" style={{
            }}>
                {/* Toast Container */}
                <div
                    className="position-fixed bottom-0 left-0 p-3"
                    style={{ zIndex: 1050, minWidth: '350px' }}
                >
                    {toasts.map((toast) => (
                        <Toast uuid={toast.id} key={toast.id} toast={toast.toast} onClose={() => removeToast(toast.id)} />
                    ))}
                </div>


            </div>
        </>
    )
}



const Toast = (props: { toast: any, onClose: any, uuid: string }) => {
    const [isClosing, setIsClosing] = useState<boolean>(false);

    const handleClose = (): void => {
        setIsClosing(true);
        setTimeout(() => {
            props.onClose();
        }, 5000);
    };

    const getToastStyles = (): React.CSSProperties => {
        const baseStyles: React.CSSProperties = {
            backdropFilter: 'blur(10px)',
            border: 'none',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '10px',
            borderLeft: '4px solid'
        };

        return { ...baseStyles };
    };


    return (
        <div
            className={`toast show ${isClosing ? 'toast-slide-out' : 'toast-slide-in'}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={getToastStyles()}
        >


            <PlayAudio uuid={props.uuid} />
            <div
                className="toast-body fw-medium"
            >
                {props.toast}
                <button
                    type="button"
                    className="btn-close btn-close-white ms-2 position-fixed top-0 end-0 p-2"
                    aria-label="Close"
                    onClick={handleClose}
                />
            </div>

        </div>
    );
};

export default ToastApp;