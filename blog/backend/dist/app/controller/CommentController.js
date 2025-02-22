"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../framework/common/auth");
const CommentService_1 = __importDefault(require("../service/CommentService"));
class CommentController {
    createComment(req, res, next) {
        const body = req.body;
        CommentService_1.default.createComment(body).then(response => {
            const commentResp = Object.assign(Object.assign({}, body), { id: response.insertedId });
            res.status(200).send(commentResp);
        }).catch(err => {
            next(err);
        });
    }
    getAllCommentByPostId(req, res, next) {
        const body = req.body;
        CommentService_1.default.getPageCommentByPostId(body).then(response => {
            const resp = response.map(comment => {
                return Object.assign(Object.assign({}, comment), { id: comment._id.toString() });
            });
            res.send(resp);
        }).catch(err => next(err));
    }
    removeCommentById(req, res, next) {
        const commentId = req.params['id'];
        CommentService_1.default.removeCommentById(commentId, (0, auth_1.getUserLoggined)(req).userId)
            .then(() => {
            res.status(200);
        }).catch(err => {
            next(err);
        });
    }
}
exports.default = new CommentController();
