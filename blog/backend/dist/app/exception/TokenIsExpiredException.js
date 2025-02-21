"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenIsExpiredException extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}
exports.default = TokenIsExpiredException;
