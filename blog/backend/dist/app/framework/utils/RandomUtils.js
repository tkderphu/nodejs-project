"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random6Digit = void 0;
const random6Digit = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
exports.random6Digit = random6Digit;
