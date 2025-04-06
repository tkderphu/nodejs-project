export const NotificationNewPostTempalte = (data: {
    postId: string,
    postName: string
    authorName: string,
    createdAt: any
})  => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Post Notification</title>
        <style>
            .notification {
                background-color: #f7f7f7;
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 16px;
                font-family: Arial, sans-serif;
                width: 300px;
                margin: 10px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .notification-header {
                font-size: 18px;
                font-weight: bold;
                color: #333;
            }
            .notification-content {
                font-size: 14px;
                color: #555;
                margin-top: 8px;
            }
            .notification-footer {
                font-size: 12px;
                color: #888;
                margin-top: 12px;
                text-align: right;
            }
            .notification a {
                text-decoration: none;
                color: #007BFF;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="notification">
            <div class="notification-header">
                Bài viết mới: ${data.postName}
            </div>
            <div class="notification-content">
                <p><strong>Tác giả:</strong> ${data.authorName}</p>
            </div>
            <div class="notification-footer">
                <p><strong>Published on:</strong>${data.createdAt}</p>
                <p><a href="/posts/${data.postId}">Nhấn để xem bài viết</a></p>
            </div>
        </div>
    </body>
    </html>
    `
}

export const NotificationNewComment = (data: {
    postName: string
    userFullName: string,
    createdAt: any,
    commentId: string
}) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Post Notification</title>
        <style>
            .notification {
                background-color: #f7f7f7;
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 16px;
                font-family: Arial, sans-serif;
                width: 300px;
                margin: 10px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .notification-header {
                font-size: 18px;
                font-weight: bold;
                color: #333;
            }
            .notification-content {
                font-size: 14px;
                color: #555;
                margin-top: 8px;
            }
            .notification-footer {
                font-size: 12px;
                color: #888;
                margin-top: 12px;
                text-align: right;
            }
            .notification a {
                text-decoration: none;
                color: #007BFF;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="notification">
            <div class="notification-header">
                Bình luận mới về: ${data.postName}
            </div>
            <div class="notification-content">
                <p><strong>Người dùng:</strong> ${data.userFullName}</p>
            </div>
            <div class="notification-footer">
                <p><strong>Published on:</strong>${data.createdAt}</p>
                <p><a href="/comments/${data.commentId}">Nhấn để xem bình luận</a></p>
            </div>
        </div>
    </body>
    </html>
    `
}

export const NotificationReplyComment = (data: {
    postName: string
    userFullName: string,
    createdAt: any,
    parentCommentId: string,
    commentId: string
}) => {
    
}