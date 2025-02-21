"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CommentController_1 = __importDefault(require("../app/controller/CommentController"));
const middleware_1 = require("../middleware/middleware");
const commentRouter = (0, express_1.Router)();
commentRouter.post('/api/comments', middleware_1.authMiddleWare, CommentController_1.default.createComment);
commentRouter.get('/api/comments/post/:postId', CommentController_1.default.getAllCommentByPostId);
commentRouter.delete('/api/comments/:id', CommentController_1.default.removeCommentById);
commentRouter.use(middleware_1.handlerExceptionMiddleWare);
exports.default = commentRouter;
