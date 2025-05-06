import { getUserLoggined } from "../framework/common/auth";
import UserService from "../service/UserService";
class UserController {
    updateProfile(req, res, next) {
        const { fullName, bio } = req.body;
        UserService.updateProfileById(getUserLoggined(req).userId, { fullName, bio }).then(response => {
            res.status(200).send("update successfully");
        }).catch(err => {
            next(err);
        });
    }
    updatePassword(req, res, next) {
        const { oldPassword, newPassword } = req.body;
        UserService.updatePassword(getUserLoggined(req).userId, oldPassword, newPassword).then(response => {
            res.status(200).send("update password successfully");
        }).catch(err => {
            next(err);
        });
    }
    updateSocialNetworkPlatform(req, res, next) {
        const socialNetworkPlatformReq = req.body;
        UserService.updateSocialNetworkPlatform(getUserLoggined(req).userId, socialNetworkPlatformReq).then(resp => {
            res.status(200).send("ok");
        }).catch(err => {
            next(err);
        });
    }
    getUserProfile(req, res, next) {
        const { userId } = req.params;
        UserService.getProfile(userId).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            next(err);
        });
    }
    updateProfileInfo(req, res, next) {
        const body = req.body;
        UserService.updateProfileInfo(getUserLoggined(req).userId, body).then(resp => {
            res.status(200).send("update info ok");
        }).catch(err => {
            next(err);
        });
    }
}
export default new UserController();
