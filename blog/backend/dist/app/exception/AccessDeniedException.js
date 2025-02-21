"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccessDeniedException extends Error {
    constructor(message) {
        super(message);
        this.status = 403;
    }
}
exports.default = AccessDeniedException;
