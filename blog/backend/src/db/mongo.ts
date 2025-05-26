import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
import { ACCESS_TOKEN_DOCUMENT, BOOK_MARK_DOCUMENT, COMMENT_DOCUMENT, FIREBASE_MESSAGE_TOKEN_DOCUMENT, FLOWER_DOCUMENT, FOLLOW_DOCUMENT, GALLERY_DOCUMENT, LIKE_DOCUMENT, NOTIFY_MESSAGE_DOCUMENT, POST_DOCUMENT, REFRESH_TOKEN_DOCUMENT, REPORT_DOCUMENT, SERIES_DOCUMENT, SETTING_DOCUMENT, TAGGING_DOCUMENT, TRANSACTION_DOCUMENT, UNLOCK_POST_DOCUMENT, USER_DOCUMENT } from "./document";
dotenv.config()




const URL_MONGODB: string = process.env.URL_MONGODB || ""


let client: MongoClient = new MongoClient("mongodb://localhost:27017")

if (process.env.NODE_ENV !== 'test') {

    client.connect().then(c => {
        console.log("ok")
    }).catch(err => {
        console.log(err)
    })
}

let db = client.db("blogs")

const UserRepository = db.collection(USER_DOCUMENT)
const PostRepository = db.collection(POST_DOCUMENT)
const TaggingRepository = db.collection(TAGGING_DOCUMENT)
const RefreshTokenRepository = db.collection(REFRESH_TOKEN_DOCUMENT)
const CommentRepository = db.collection(COMMENT_DOCUMENT)
const AccessTokenRepository = db.collection(ACCESS_TOKEN_DOCUMENT)
const LikeRepository = db.collection(LIKE_DOCUMENT)
const BookMarkRepository = db.collection(BOOK_MARK_DOCUMENT)
const FollowRepository = db.collection(FOLLOW_DOCUMENT)
const NotifyMessageRepository = db.collection(NOTIFY_MESSAGE_DOCUMENT)
const FirebaseMessageTokenRepository = db.collection(FIREBASE_MESSAGE_TOKEN_DOCUMENT)
const GalleryRepository = db.collection(GALLERY_DOCUMENT)
const SeriesRepository = db.collection(SERIES_DOCUMENT)
const FlowerRepository = db.collection(FLOWER_DOCUMENT)
const UnlockPostRepository = db.collection(UNLOCK_POST_DOCUMENT)
const TransactionRepository = db.collection(TRANSACTION_DOCUMENT)
const SettingRepository = db.collection(SETTING_DOCUMENT)
const ReportRepository = db.collection(REPORT_DOCUMENT)
export {
    UserRepository,
    SeriesRepository,
    ReportRepository,
    PostRepository,
    TaggingRepository,
    RefreshTokenRepository,
    CommentRepository,
    AccessTokenRepository,
    LikeRepository,
    BookMarkRepository,
    FollowRepository,
    NotifyMessageRepository,
    FirebaseMessageTokenRepository,
    GalleryRepository,
    FlowerRepository,
    UnlockPostRepository,
    TransactionRepository,
    SettingRepository
}