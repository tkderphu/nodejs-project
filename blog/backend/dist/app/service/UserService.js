"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../db/mongo");
class UserService {
    create(user) {
        return mongo_1.UserRepository.insertOne(user);
    }
    findById(id) {
        return mongo_1.UserRepository.findOne({
            _id: new mongodb_1.ObjectId(id)
        });
    }
    findByEmail(email) {
        return mongo_1.UserRepository.findOne({
            email: email
        });
    }
    updatePasswordById(userId, password) {
        return this.updateById(userId, { password });
    }
    updateProfileById(userId, profile) {
        return this.updateById(userId, profile);
    }
    updateById(userId, data) {
        return mongo_1.UserRepository.updateOne({
            _id: new mongodb_1.ObjectId(userId)
        }, {
            $set: Object.assign({}, data)
        });
    }
}
exports.default = new UserService;
