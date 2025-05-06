var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ObjectId } from "mongodb";
import { CommentRepository } from "../../db/mongo";
import NotificationService from "./NotificationService";
import PostService from "./PostService";
import UserService from "./UserService";
class CommentService {
    createComment(userId, commentReq) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield PostService.findById(commentReq.postId);
            const author = yield UserService.findById(userId);
            const comment = {
                createdDate: new Date(),
                imageUrls: commentReq.imageUrls,
                postId: commentReq.postId,
                content: commentReq.content,
                rootCommentId: commentReq.rootCommentId,
                replyCommentId: commentReq.replyCommentId,
                userId: userId
            };
            const resultInsert = yield CommentRepository.insertOne(comment);
            if (post.userId != userId && !commentReq.replyCommentId) {
                NotificationService.saveNotifyComment(resultInsert.insertedId.toString(), {
                    _id: author === null || author === void 0 ? void 0 : author._id.toString(),
                    avatar: author.image_url,
                    fullName: author.fullName
                }, {
                    _id: post._id.toString(),
                    title: post.title
                });
            }
            else if (commentReq.replyCommentId) {
                NotificationService.saveNotifyReplyComment(commentReq.replyCommentId, {
                    _id: author === null || author === void 0 ? void 0 : author._id.toString(),
                    avatar: author.image_url,
                    fullName: author.fullName
                }, {
                    _id: post._id.toString(),
                    title: post.title
                });
            }
            return resultInsert;
        });
    }
    getListCommentByPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield CommentRepository.find({
                postId: postId,
                rootCommentId: null
            }).sort({ "createdDate": -1 }).toArray();
            const result = [];
            for (let comment of comments) {
                result.push(Object.assign(Object.assign({}, comment), { user: yield UserService.findById(comment.userId), nestedComments: yield this.getListCommentByRoot(comment._id.toString()) }));
            }
            return result;
        });
    }
    getListCommentByRoot(rootCommentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reuslt = yield CommentRepository.find({
                rootCommentId: rootCommentId
            }).sort({ "createdDate": -1 }).toArray();
            const res = [];
            for (let comment of reuslt) {
                res.push(Object.assign(Object.assign({}, comment), { user: yield UserService.findById(comment.userId), replyComment: yield this.getCommentById(comment.replyCommentId) }));
            }
            return res;
        });
    }
    getCommentById(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield CommentRepository.findOne({
                _id: new ObjectId(commentId)
            });
            return Object.assign(Object.assign({}, comment), { user: yield UserService.findById(comment.userId) });
        });
    }
    removeCommentById(commentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield CommentRepository.deleteOne({
                _id: new ObjectId(commentId),
                "user._id": new ObjectId(userId)
            });
            return true;
        });
    }
    countByPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return CommentRepository.countDocuments({
                postId: postId
            });
        });
    }
}
export default new CommentService();
