var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import JwtService from "../app/service/JwtService";
import TokenService from "../app/service/TokenService";
import multer from 'multer';
export const authMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const accessToken = ((_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.substring(7)) || "";
    if (!accessToken) {
        console.log("loz");
        res.status(401).send("Access Denied");
    }
    else if (JwtService.tokenIsExpired(accessToken)) {
        console.log("loz2");
        res.status(401).send("Unauthorized");
    }
    else {
        try {
            const whetherTokenIsExists = yield TokenService.findAccessToken(accessToken);
            if (!whetherTokenIsExists) {
                res.send(401).send("Invalid token");
            }
            const payload = JwtService.getPayload(accessToken);
            req.userId = payload.userId;
            req.roles = payload.roles;
            next();
        }
        catch (err) {
            console.log("cai loz gi the");
            res.status(401).send("Unauthorized");
        }
    }
});
export const handlerExceptionMiddleWare = (err, req, res, next) => {
    console.error(err.stack);
    console.log("vllllllllllllll-");
    res.status(err.status || 500).json({ error: err.message });
};
export const parseFileMiddleWare = multer({
    storage: multer.memoryStorage()
});
