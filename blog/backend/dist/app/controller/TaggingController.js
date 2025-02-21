"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TaggingService_1 = __importDefault(require("../service/TaggingService"));
class TaggingController {
    constructor() {
        this.taggingService = TaggingService_1.default;
    }
    createTagging(req, res) {
    }
    getTaggingList(req, res) {
    }
}
exports.default = new TaggingController();
