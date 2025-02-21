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
exports.MailService = void 0;
const nodemailer_1 = require("nodemailer");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = (0, nodemailer_1.createTransport)({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL || 'quangphu2060@gmail.com',
        pass: process.env.EMAIL_PASSWORD_APP || ''
    }
});
const mailOptions = (toEmail, subject, content) => {
    return {
        from: process.env.EMAIL,
        to: toEmail,
        subject: subject,
        html: content
    };
};
class MailService {
    sendMail(toEmail, subject, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield transporter.sendMail(mailOptions(toEmail, subject, content));
            if (!result) {
                console.log("send mail error");
            }
            else {
                console.log("response: " + result.response);
            }
        });
    }
}
exports.MailService = MailService;
exports.default = new MailService();
