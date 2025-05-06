import AuthenService from "../service/AuthenService";
class AuthController {
    login(req, res, next) {
        console.log("login-------------");
        AuthenService.login(req.body).then(result => {
            res.status(200).send(result);
        }).catch(err => next(err));
    }
    register(req, res, next) {
        AuthenService.register(req.body).then(result => {
            res.status(200).send(result);
        }).catch(err => next(err));
    }
    refreshToken(req, res, next) {
        const { accessToken, refreshToken } = req.body;
        AuthenService.refreshToken(accessToken, refreshToken).then(result => {
            res.status(200).send(result);
        }).catch(err => next(err));
    }
    forgetPassword(req, res, next) {
        const email = req.query.email;
        AuthenService.forgetPassword(email).then(result => {
            res.status(200).send("We have sent to your email with code for reset password, please check and paste it at here.");
        }).catch(err => next(err));
    }
    logout(req, res, next) {
        const accessToken = req.query.accessToken;
        AuthenService.logout(accessToken).then(result => {
            res.status(200).send(result);
        }).catch(err => next(err));
    }
}
export default new AuthController();
