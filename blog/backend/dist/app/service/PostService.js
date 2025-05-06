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
import LikeService from "./LikeService";
import { FlowerRepository, PostRepository, SeriesRepository, UnlockPostRepository } from "../../db/mongo";
import TaggingService from "./TaggingService";
import PostNotFoundException from "../exception/PostNotFoundException";
import UserService from "./UserService";
import BookMarkService from "./BookMarkService";
import NotificationService from "./NotificationService";
import FollowService from "./FollowService";
import TransactionService from "./TransactionService";
class PostService {
    save(userId, postReq) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSimpl = yield UserService.findById(userId);
            const post = {
                comment: 0,
                like: 0,
                view: 0,
                timestamps: {
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                userId: userId,
                content: postReq.content,
                description: postReq.description,
                displayUrl: postReq.displayUrl,
                title: postReq.title,
                bookmark: 0,
                taggings: (yield TaggingService.save(postReq.taggingNames))
            };
            const resp = yield PostRepository.insertOne(post);
            //@ts-ignore
            NotificationService.saveNotifyPost({ _id: userSimpl === null || userSimpl === void 0 ? void 0 : userSimpl._id.toString(), fullName: userSimpl === null || userSimpl === void 0 ? void 0 : userSimpl.fullName }, { _id: resp.insertedId, title: post.title })
                .then(resp => {
                //send
            }).catch(err => {
                console.error("error send notifcation: ", err);
            });
        });
    }
    update(postId, post) {
        return PostRepository.updateOne({
            _id: new ObjectId(postId)
        }, {
            $set: Object.assign({}, post)
        });
    }
    getPostDetail(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.findById(postId);
            post.user = yield UserService.findById(post.userId);
            post.bookmark = yield BookMarkService.countBookmark(post._id.toString(), 'POST');
            if (post.numberFlower && userId) {
                const unlock = yield UnlockPostRepository.findOne({
                    postId: postId,
                    userId: userId
                });
                if (unlock) {
                    post.currentUserUnloked = true;
                }
            }
            return post;
        });
    }
    findById(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield PostRepository.findOne({
                _id: new ObjectId(postId)
            });
            if (result)
                return result;
            throw new PostNotFoundException("post not found");
        });
    }
    countPostIsCreatedByUserId(userId) {
        return PostRepository.countDocuments({
            userPostId: userId
        });
    }
    findAll(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const countDocuments = yield PostRepository.countDocuments({});
            const totalPage = Math.ceil(countDocuments / limit);
            const skip = (page - 1) * limit;
            let result = PostRepository.find({})
                .skip(skip)
                .sort({ 'timestamps.createdAt': -1 })
                .limit(limit);
            let posts = (yield result.toArray());
            for (let i = 0; i < (posts === null || posts === void 0 ? void 0 : posts.length); i++) {
                posts[i].user = yield UserService.findById(posts[i].userId);
                posts[i].bookmark = yield BookMarkService.countBookmark(posts[i]._id.toString(), 'POST');
            }
            const pageResult = {
                currentPage: page,
                list: posts,
                totalPage: totalPage
            };
            return pageResult;
        });
    }
    findAllByFollowed(userId, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const followed = yield FollowService.getListFollowed(userId, "USER");
            const followedIds = followed.map(fol => {
                var _a;
                return (_a = fol.followObject._id) === null || _a === void 0 ? void 0 : _a.toString();
            });
            const countDocuments = yield PostRepository.countDocuments({
                "userId": {
                    $in: followedIds
                }
            });
            const totalPage = Math.ceil(countDocuments / limit);
            const skip = (page - 1) * limit;
            let result = PostRepository.find({
                "userId": {
                    $in: followedIds
                }
            })
                .skip(skip)
                .sort({ 'timestamps.createdAt': -1 })
                .limit(limit);
            let posts = (yield result.toArray());
            for (let i = 0; i < (posts === null || posts === void 0 ? void 0 : posts.length); i++) {
                posts[i].user = yield UserService.findById(posts[i].userId);
                posts[i].bookmark = yield BookMarkService.countBookmark(posts[i]._id.toString(), 'POST');
            }
            const pageResult = {
                currentPage: page,
                list: posts,
                totalPage: totalPage
            };
            return pageResult;
        });
    }
    findAllByMyBookmark(userId, type, page, limit, sortDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookmarks = (yield BookMarkService.getBookmarks(userId, type));
            if (type == 'POST') {
                const postObjectId = bookmarks.map(bookmark => {
                    return new ObjectId(bookmark.objId);
                });
                const countDocuments = (yield PostRepository.countDocuments({
                    _id: {
                        $in: postObjectId
                    }
                }));
                const totalPage = Math.ceil(countDocuments / limit);
                const skip = (page - 1) * limit;
                let result = PostRepository.find({
                    _id: {
                        $in: postObjectId
                    }
                })
                    .skip(skip)
                    .sort({ 'timestamps.createdAt': sortDate })
                    .limit(limit);
                let posts = (yield result.toArray());
                for (let i = 0; i < (posts === null || posts === void 0 ? void 0 : posts.length); i++) {
                    posts[i].user = yield UserService.findById(posts[i].userId);
                    posts[i].bookmark = yield BookMarkService.countBookmark(posts[i]._id.toString(), 'POST');
                }
                const pageResult = {
                    currentPage: page,
                    list: posts,
                    totalPage: totalPage
                };
                return pageResult;
            }
            else {
                const seriesObjectIds = bookmarks.map(bookmark => {
                    return new ObjectId(bookmark.objId);
                });
                const countDocuments = (yield SeriesRepository.countDocuments({
                    _id: {
                        $in: seriesObjectIds
                    }
                }));
                const totalPage = Math.ceil(countDocuments / limit);
                const skip = (page - 1) * limit;
                let result = SeriesRepository.find({
                    _id: {
                        $in: seriesObjectIds
                    }
                })
                    .skip(skip)
                    .sort({ 'timestamps.createdAt': sortDate })
                    .limit(limit);
                let series = (yield result.toArray());
                for (let i = 0; i < (series === null || series === void 0 ? void 0 : series.length); i++) {
                    series[i].user = yield UserService.findById(series[i].userId);
                    series[i].bookmark = yield BookMarkService.countBookmark(series[i]._id.toString(), 'POST');
                }
                const pageResult = {
                    currentPage: page,
                    list: series,
                    totalPage: totalPage
                };
                return pageResult;
            }
        });
    }
    updatelikePost(postId, userLikeId, up) {
        if (up > 0) {
            LikeService.createLike({
                userLikeId: userLikeId,
                postId: postId
            });
        }
        else {
            LikeService.deletelikePost(postId, userLikeId);
        }
        return PostRepository.updateOne({
            _id: new ObjectId(postId)
        }, {
            $inc: {
                like: up
            }
        });
    }
    unlockPost(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const flower = yield FlowerRepository.findOne({
                userId: userId
            });
            const unlockDoc = yield UnlockPostRepository.findOne({
                userId: userId,
                postId: postId
            });
            if (unlockDoc) {
                return;
            }
            if (flower) {
                throw new Error("Bạn không đủ hoa để mở khóa");
            }
            const post = yield PostRepository.findOne({
                _id: new ObjectId(postId)
            });
            if (post.numberFlower) {
                if (flower.numberFlower < post.numberFlower) {
                    throw new Error("Bạn không đủ hoa để mở khóa");
                }
                yield TransactionService.addFlower("UNLOCK_ARTICLE", post.numberFlower, userId, post.userId, postId);
                yield UnlockPostRepository.insertOne({
                    postId: postId,
                    userId: userId
                });
            }
        });
    }
}
export default new PostService();
