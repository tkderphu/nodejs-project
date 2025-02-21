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
const CommentService_1 = __importDefault(require("./CommentService"));
const LikeService_1 = __importDefault(require("./LikeService"));
const mongo_1 = require("../../db/mongo");
const AccessDeniedException_1 = __importDefault(require("../exception/AccessDeniedException"));
class PostService {
    save(post) {
        return mongo_1.PostRepository.insertOne(Object.assign({}, post));
    }
    update(id, post) {
        return mongo_1.PostRepository.updateOne({
            _id: new mongodb_1.ObjectId(id)
        }, {
            $set: Object.assign({}, post)
        });
    }
    findById(postId) {
        return mongo_1.PostRepository.findOne({
            _id: new mongodb_1.ObjectId(postId)
        });
    }
    findAllByCondition(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (req.taggingId) {
                filter.taggingId = req.taggingId;
            }
            if (req.startDate && req.endDate) {
                filter.createdDate.$gte = new Date(req.startDate);
                filter.createdDate.$lte = new Date(req.endDate);
            }
            if (req.userPostId) {
                filter.userPostId = req.userPostId;
            }
            if (req.keyword) {
                filter.$text.$search = req.keyword;
            }
            const countDocuments = yield mongo_1.PostRepository.countDocuments(filter);
            const totalPage = Math.ceil(countDocuments / req.limit);
            const skip = (req.page - 1) * req.limit;
            let result = mongo_1.PostRepository
                .find(filter)
                .skip(skip)
                .limit(req.limit);
            if (req.sort) {
                result = result.sort(req.sort);
            }
            let list = (yield result.toArray());
            const pageResult = {
                currentPage: req.page,
                list: list,
                totalPage: totalPage
            };
            return pageResult;
        });
    }
    countPostIsCreatedByUserId(userId) {
        return mongo_1.PostRepository.countDocuments({
            userPostId: userId
        });
    }
    updatelikePost(postId, userLikeId, up) {
        if (up > 0) {
            LikeService_1.default.createLike({
                userLikeId: userLikeId,
                postId: postId
            });
        }
        else {
            LikeService_1.default.deletelikePost(postId, userLikeId);
        }
        return mongo_1.PostRepository.updateOne({
            _id: new mongodb_1.ObjectId(postId)
        }, {
            $inc: {
                like: up
            }
        });
    }
    deletePost(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = (yield this.findById(postId));
            if (post) {
                if (post.userPostId !== userId) {
                    throw new AccessDeniedException_1.default("You can't perform this action");
                }
                LikeService_1.default.deleteAllLikePost(postId, userId);
                CommentService_1.default.removeAllByPostId(postId);
            }
        });
    }
}
exports.default = new PostService();
