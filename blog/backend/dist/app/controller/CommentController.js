import { getUserLoggined } from "../framework/common/auth";
import CommentService from "../service/CommentService";
class CommentController {
    createComment(req, res, next) {
        const body = req.body;
        CommentService.createComment(getUserLoggined(req).userId, body).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            next(err);
        });
    }
    getAllCommentByPostId(req, res, next) {
        const { postId } = req.params;
        CommentService.getListCommentByPost(postId).then(response => {
            res.send(response);
        }).catch(err => next(err));
    }
    removeCommentById(req, res, next) {
        const { id } = req.params;
        CommentService.removeCommentById(id, getUserLoggined(req).userId)
            .then(() => {
            res.status(200);
        }).catch(err => {
            next(err);
        });
    }
}
export default new CommentController();
