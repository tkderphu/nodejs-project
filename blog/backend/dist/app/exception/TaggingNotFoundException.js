"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaggingNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
    }
}
exports.default = TaggingNotFoundException;
