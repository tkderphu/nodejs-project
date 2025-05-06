import { getUserLoggined } from "../framework/common/auth";
import PostService from "../service/PostService";
class PostController {
    createPost(req, res, next) {
        const body = req.body;
        PostService.save(getUserLoggined(req).userId, body).then(result => {
            res.status(200).send(true);
        }).catch(err => next(err));
    }
    getListPostByFollowed(req, res, next) {
    }
    getListPost(req, res, next) {
        const page = Number.parseInt(req.query.page) || 1;
        const limit = Number.parseInt(req.query.limit) || 10;
        const type = req.query.type;
        if (type === "NORMAL") {
            PostService.findAll(page, limit).then(resp => {
                res.status(200).send(resp);
            }).catch(err => {
                next(err);
            });
        }
        else if (type === "FOLLOWED") {
            const userId = req.query.userId;
            PostService.findAllByFollowed(userId, page, limit).then(resp => {
                res.status(200).send(resp);
            }).catch(err => next(err));
        }
        else if (type === "BOOKMARK") {
            const bookmarkType = req.query.bookmarkType;
            const userId = req.query.userId;
            PostService.findAllByMyBookmark(userId, bookmarkType, page, limit, -1).then(resp => {
                res.status(200).send(resp);
            }).catch(err => next(err));
        }
    }
    getPostDetail(req, res, next) {
        const { id } = req.params;
        const { u } = req.query;
        PostService.getPostDetail(id, u).then(resp => {
            res.status(200).send(resp);
        }).catch(err => {
            next(err);
        });
    }
    updatePost(req, res, next) {
        const postId = req.params['postId'];
        const body = req.body;
        PostService.update(postId, body).then(result => {
            res.status(200).send(result);
        }).catch(err => {
            next(err);
        });
    }
    unlockPost(req, res, next) {
        const { id } = req.params;
        PostService.unlockPost(id, getUserLoggined(req).userId).then(result => {
            res.status(200).send(result);
        }).catch(err => {
            next(err);
        });
    }
}
export default new PostController();
