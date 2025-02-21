import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
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

const UserRepository = db.collection('user')
const PostRepository = db.collection('post')
const TaggingRepository = db.collection('tagging')
const RefreshTokenRepository = db.collection('refreshToken')
const CommentRepository = db.collection("comment")
const AccessTokenRepository = db.collection('accessToken')
const LikeRepository = db.collection('like')

export {
    UserRepository,
    PostRepository,
    TaggingRepository,
    RefreshTokenRepository,
    CommentRepository,
    AccessTokenRepository,
    LikeRepository
}