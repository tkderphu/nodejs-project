import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
import { ACCESS_TOKEN_DOCUMENT, BOOK_MARK_DOCUMENT, COMMENT_DOCUMENT, LIKE_DOCUMENT, POST_DOCUMENT, REFRESH_TOKEN_DOCUMENT, TAGGING_DOCUMENT, USER_DOCUMENT } from "./document";
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
export {
    UserRepository,
    PostRepository,
    TaggingRepository,
    RefreshTokenRepository,
    CommentRepository,
    AccessTokenRepository,
    LikeRepository,
    BookMarkRepository
}