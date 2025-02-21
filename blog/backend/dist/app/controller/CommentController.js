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
const CommentService_1 = __importDefault(require("../service/CommentService"));
class CommentController {
    createComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (err) {
                next(err);
            }
        });
    }
    getAllCommentByPostId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = req.params['postId'];
            res.send("Hello postId: " + postId);
            // const listPost = await this.commentService.getAllCommentByPostId(postId)
            // if(!listPost) {
            // } else {
            //     res.status(200).send(listPost)
            // }
        });
    }
    removeCommentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentId = req.params['id'];
            const result = yield CommentService_1.default.removeCommentById(commentId);
            if (!result) {
            }
            else {
                res.status(200).send("ok");
            }
        });
    }
}
exports.default = new CommentController();
