"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../db/mongo");
class CommentService {
    createComment(req) {
        const comment = Object.assign({}, req);
        return mongo_1.CommentRepository.insertOne(comment);
    }
    getAllCommentByPostId(postId) {
        return mongo_1.CommentRepository.find({
            postId: postId
        }).toArray();
    }
    removeCommentById(commentId) {
        return mongo_1.CommentRepository.deleteOne({
            _id: new mongodb_1.ObjectId(commentId)
        });
    }
    removeAllByPostId(postId) {
        return mongo_1.CommentRepository.deleteMany({
            postId: postId
        });
    }
}
exports.default = new CommentService();
