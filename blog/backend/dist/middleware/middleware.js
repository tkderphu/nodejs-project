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
exports.handlerExceptionMiddleWare = exports.authMiddleWare = void 0;
const JwtService_1 = __importDefault(require("../app/service/JwtService"));
const TokenService_1 = __importDefault(require("../app/service/TokenService"));
const authMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const accessToken = ((_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.substring(7)) || "";
    if (!accessToken) {
        res.status(401).send("Access Denied");
    }
    else if (JwtService_1.default.tokenIsExpired(accessToken)) {
        res.status(401).send("Unauthorized");
    }
    else {
        try {
            const whetherTokenIsExists = yield TokenService_1.default.findAccessToken(accessToken);
            if (!whetherTokenIsExists) {
                res.send(401).send("Invalid token");
            }
            const payload = JwtService_1.default.getPayload(accessToken);
            req.userId = payload.userId;
            req.roles = payload.roles;
            next();
        }
        catch (err) {
            res.status(401).send("Unauthorized");
        }
    }
});
exports.authMiddleWare = authMiddleWare;
const handlerExceptionMiddleWare = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status).json({ error: err.message });
};
exports.handlerExceptionMiddleWare = handlerExceptionMiddleWare;
