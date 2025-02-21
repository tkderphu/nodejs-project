"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeRepository = exports.AccessTokenRepository = exports.CommentRepository = exports.RefreshTokenRepository = exports.TaggingRepository = exports.PostRepository = exports.UserRepository = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const URL_MONGODB = process.env.URL_MONGODB || "";
let client = new mongodb_1.MongoClient("mongodb://localhost:27017");
if (process.env.NODE_ENV !== 'test') {
    client.connect().then(c => {
        console.log("ok");
    }).catch(err => {
        console.log(err);
    });
}
let db = client.db("blogs");
const UserRepository = db.collection('user');
exports.UserRepository = UserRepository;
const PostRepository = db.collection('post');
exports.PostRepository = PostRepository;
const TaggingRepository = db.collection('tagging');
exports.TaggingRepository = TaggingRepository;
const RefreshTokenRepository = db.collection('refreshToken');
exports.RefreshTokenRepository = RefreshTokenRepository;
const CommentRepository = db.collection("comment");
exports.CommentRepository = CommentRepository;
const AccessTokenRepository = db.collection('accessToken');
exports.AccessTokenRepository = AccessTokenRepository;
const LikeRepository = db.collection('like');
exports.LikeRepository = LikeRepository;
