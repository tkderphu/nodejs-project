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
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("../../db/mongo");
class LikeService {
    createLike(like) {
        return mongo_1.LikeRepository.insertOne(Object.assign({}, like));
    }
    deletelikePost(postId, userId) {
        return this.deleteLike({ postId: postId, userLikeId: userId });
    }
    deleteLikeComment(commentId, userId) {
        return this.deleteLike({ commentId: commentId, userLikeId: userId });
    }
    deleteAllLikePost(postId, userId) {
    }
    deleteAllLikeComment(commentId, userId) {
    }
    deleteLike(obj) {
        return mongo_1.LikeRepository.deleteOne(Object.assign({}, obj));
    }
    isUserLikePost(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_1.LikeRepository.find({
                postId: postId,
                userLikeId: userId
            });
            if (result) {
                return true;
            }
            return false;
        });
    }
    isUserLikeComment(commentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_1.LikeRepository.find({
                commentId: commentId,
                userLikeId: userId
            });
            if (result) {
                return true;
            }
            return false;
        });
    }
}
exports.default = new LikeService();
