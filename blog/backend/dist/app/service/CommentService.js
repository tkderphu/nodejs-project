"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../db/mongo");
const page_1 = require("../framework/common/page");
const LikeService_1 = __importDefault(require("./LikeService"));
class CommentService {
    createComment(req) {
        const comment = Object.assign({}, req);
        return mongo_1.CommentRepository.insertOne(comment);
    }
    getPageCommentByPostId(commentPageReq) {
        return __awaiter(this, void 0, void 0, function* () {
            const arr = yield mongo_1.CommentRepository.find({
                postId: commentPageReq.postId
            }).skip((0, page_1.startFrom)(commentPageReq))
                .limit(commentPageReq.limit)
                .sort({ createdDate: -1 }).toArray();
            return arr || new Array();
        });
    }
    removeCommentById(commentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield LikeService_1.default.deleteLikeComment(commentId, userId);
            yield mongo_1.CommentRepository.deleteOne({
                _id: new mongodb_1.ObjectId(commentId)
            });
            return true;
        });
    }
    removeAllByPostId(postId) {
        return mongo_1.CommentRepository.deleteMany({
            postId: postId
        });
    }
}
exports.default = new CommentService();
