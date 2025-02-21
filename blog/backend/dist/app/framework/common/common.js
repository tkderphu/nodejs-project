"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserLoggined = void 0;
const getUserLoggined = (req) => {
    return {
        userId: req.userId,
        roles: req.roles
    };
};
exports.getUserLoggined = getUserLoggined;
