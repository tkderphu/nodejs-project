"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../framework/common/common");
const PostService_1 = __importDefault(require("../service/PostService"));
class PostController {
    createPost(req, res, next) {
        const body = req.body;
        PostService_1.default.save(body).then(result => {
            res.status(200).send(result);
        }).catch(err => next(err));
    }
    getListPost(req, res, next) {
        const any = req.body;
        PostService_1.default.findAllByCondition(any).then(result => {
            res.status(200).send(result);
        }).catch(err => next(err));
    }
    updatePost(req, res, next) {
        const postId = req.params['postId'];
        const body = req.body;
        PostService_1.default.update(postId, body).then(result => {
            res.status(200).send(result);
        }).catch(err => {
            next(err);
        });
    }
    updatelikePost(req, res, next) {
        const body = req.body;
        PostService_1.default.updatelikePost(body.postId, body.userLikeId, (body.up ? 1 : -1)).then(result => {
            res.send(200);
        }).catch((err) => next(err));
    }
    deletePost(req, res, next) {
        const postId = req.params["postId"];
        PostService_1.default.deletePost(postId, (0, common_1.getUserLoggined)(req).userId)
            .then(() => {
            res.send(200);
        }).catch(err => {
            next(err);
        });
    }
}
exports.default = new PostController();
