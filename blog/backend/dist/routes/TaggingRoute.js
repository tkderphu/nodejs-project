"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TaggingController_1 = __importDefault(require("../app/controller/TaggingController"));
const taggingRouter = (0, express_1.Router)();
taggingRouter.post('/api/taggings', TaggingController_1.default.createTagging);
taggingRouter.post('/api/taggings', TaggingController_1.default.getTaggingList);
exports.default = taggingRouter;
