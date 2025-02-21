"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../db/mongo");
class TaggingService {
    save(tagging) {
        return mongo_1.TaggingRepository.insertOne(Object.assign(Object.assign({}, tagging), { _id: new mongodb_1.ObjectId(tagging._id) }));
    }
}
exports.default = new TaggingService();
