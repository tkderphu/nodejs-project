import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchNotifyMessageAction } from '../../redux/store/action/notifyMessage/notify.message.acction';
import AlertConponent from '../common/AlertComponent';

const notifications = [
    {
        id: 1,
        avatar: 'https://i.imgur.com/9n3sX3F.png',
        content: (
            <>
                You're featured on <strong>Học viện Công nghệ Bưu chính Viễn thông</strong> - PTIT's public weekly engagement...
            </>
        ),
        time: '1d',
    },
    {
        id: 2,
        avatar: 'https://i.imgur.com/I7z5qkY.png',
        content: <>Anonymous participant likes your answer to a question.</>,
        time: '6d · 1 Reaction',
    },
    {
        id: 3,
        avatar: 'https://i.imgur.com/8ZVQOba.png',
        content: <>Ngọc Thiên followed you.</>,
        time: '6d',
        unread: true,
    },
    {
        id: 4,
        avatar: 'https://i.imgur.com/DQK1MuI.png',
        content: (
            <>
                <strong>Tôi Yêu PTIT</strong>, a Page you recently viewed, invited you to join their public group.
            </>
        ),
        time: '1w',
        unread: true,
    },
    {
        id: 5,
        avatar: 'https://i.imgur.com/mYYIVJj.png',
        content: <>Welcome to <strong>Tìm bạn học tập</strong>. Now you can post, connect with other members and more.</>,
        time: '1w',
    },
    {
        id: 6,
        avatar: 'https://i.imgur.com/xPbGEOQ.png',
        content: <>Welcome to <strong>J2TEAM Community</strong>. Now you can post, connect with other members and more.</>,
        time: '1w',
    },
];
import "./Notification.css"
import NotifyCommentTemplate from './template/NotifyCommentTemplate';
import NotifyFollowTemplate from './template/NotifyFollowTemplate';
import NotifyPostTemplate from './template/NotifyPostTemplate';
export default function Notification() {

    const [search, setSearch] = useState<"All" | "Unread">()
    const notificationState: {
        loading: boolean,
        hasError: boolean,
        error: any,
        messages: {
            _id: string,
            createdAt: Date,
            notifyType: "COMMENT" | "POST" | "FOLLOW" | "REPLY_COMMENT",
            params: any,
            userMessages: {
                read: boolean
            }
        }[]
    } = useSelector((state: any) => {
        return state.fetchAllNotifyMessage
    })
    console.log("notification state: ", notificationState)
    const dispatch = useDispatch()
    useEffect(() => {
        //@ts-ignore
         dispatch(fetchNotifyMessageAction())
    }, [])

    if (notificationState.loading || notificationState.hasError) {
        return <AlertConponent loading={notificationState.loading} hasError={notificationState.hasError} error={notificationState.error} />
    }
    return (
        <>
            <h5 className="fw-bold mb-1 mx-3">Thông báo</h5>
            <div className="d-flex justify-content-start mb-2">
                <div className={`btn  p-1 text-decoration-none mx-2 notification ${search === 'All' ? "active-search" : ""}`} onClick={() => setSearch("All")}>Tất cả</div>
                <div className={`btn  p-1 text-decoration-none notification ${search === 'Unread' ? "active-search" : ""}`} onClick={() => setSearch("Unread")}>Chưa đọc</div>
            </div>

            <ul className="list-group">
                {notificationState.messages && notificationState.messages.map(message => {
                    if (message.notifyType === "FOLLOW") {
                        return (
                            <NotifyFollowTemplate
                                time={"2w"}
                                params={message.params}
                                read={message.userMessages.read}
                            />
                        )
                    } else if(message.notifyType === "COMMENT") {
                        
                    } else if(message.notifyType === "POST") {
                        return (
                            <NotifyPostTemplate
                                params={message.params}
                                time={"2w"}
                                messageId={message._id}
                                read={message.userMessages.read}
                            />
                        )
                    } else {

                    }
                })}
                
                {/* {notifications.map((notif) => (
                    <li
                        onClick={() => {
                            navigate(`/posts/${notif.id}#comment_id_${5}`, { replace: true })
                        }}
                        key={notif.id}
                        className={`list-group-item notify-background d-flex align-items-start ${notif.unread ? '' : "text-muted"}`}
                    >
                        <NotifyCommentTemplate
                            user={{ avatar: notif.avatar, fullName: "test" }}
                            post={{ _id: "2323", title: "Handle exception in nodejs" }}
                            time={"2w"}

                        />
                    </li>
                ))} */}
            </ul>

        </>
    );

}
