var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ObjectId } from "mongodb";
import { UserRepository } from "../../db/mongo";
import UsernameOrPasswordNotMatchException from "../exception/UsernameOrPasswordNotMatchException";
import { compareHash, hashPassword, } from "../framework/common/auth";
import FollowService from "./FollowService";
import PostService from "./PostService";
class UserService {
    create(user) {
        return UserRepository.insertOne(user);
    }
    findById(id) {
        return UserRepository.findOne({
            _id: new ObjectId(id)
        });
    }
    findByEmail(email) {
        return UserRepository.findOne({
            email: email
        });
    }
    updatePassword(userId, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(userId);
            const isEqual = yield compareHash(oldPassword, user.password);
            if (isEqual) {
                const newHashPassword = yield hashPassword(newPassword);
                yield this.updateById(userId, { password: newHashPassword });
            }
            throw new UsernameOrPasswordNotMatchException("Your old password invalid");
        });
    }
    updateProfileById(userId, profile) {
        return this.updateById(userId, profile);
    }
    getProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(userId);
            if (user) {
                const profile = Object.assign(Object.assign({}, user), { followTags: yield FollowService.countFollowings(user._id.toString(), "TAG"), followings: yield FollowService.countFollowings(user._id.toString(), "USER"), followers: yield FollowService.countFollowers(user._id.toString(), "USER"), posts: yield PostService.countPostIsCreatedByUserId(user._id.toString()), bookmark: 0, comments: 0 });
                return profile;
            }
            throw new UsernameOrPasswordNotMatchException("not found user");
        });
    }
    findUserByFullName(fullName) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    updateSocialNetworkPlatform(userId, req) {
        return UserRepository.updateOne({
            _id: new ObjectId(userId)
        }, {
            $set: {
                "socialNetworkPlatform": req
            }
        });
    }
    updateById(userId, data) {
        return UserRepository.updateOne({
            _id: new ObjectId(userId)
        }, {
            $set: Object.assign({}, data)
        });
    }
    updateProfileInfo(userId, req) {
        return this.updateById(userId, req);
    }
}
export default new UserService;
