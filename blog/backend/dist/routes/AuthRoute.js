"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../app/controller/AuthController"));
const authRouter = (0, express_1.Router)();
/**
 * @swagger
 * /api/auth/login:
 *  post:
 *     tags: [auth]
 *     summary: Login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      200:
 *        description: Authentication permission.
 *        content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  userId:
 *                      type: string
 *                      example: kwer-2340vdf-sfdsg0dsg
 *                  accessToken:
 *                      type: string
 *                      example: dosifoeit43feovkd
 *                  refreshToken:
 *                      type: string
 *                      example: 0124932059435fkdsjgkfg
 *                  expiredAt:
 *                      type: number
 *                      example: 82148235259345
 *      404:
 *        description: Email or password not match
 *      500:
 *        description: Server Error
 */
authRouter.post('/api/auth/login', AuthController_1.default.login);
/**
 * @swagger
 * /api/auth/register:
 *  post:
 *     tags: [auth]
 *     summary: Register account
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      200:
 *        description: Register successfully.
 *      400:
 *        description: Email that your register was exists
 *      500:
 *        description: Server Error
 */
authRouter.post("/api/auth/register", AuthController_1.default.register);
/**
 * @swagger
 * /api/auth/refresh-token:
 *  get:
 *     tags: [auth]
 *     summary: Refresh token
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - accessToken
 *              - refreshToken
 *            properties:
 *              accessToken:
 *                type: string
 *                default: 035920539406
 *              refreshToken:
 *                type: string
 *                default: 12420342935
 *     responses:
 *      200:
 *        description: Refresh accesstoken success
 *        content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  userId:
 *                      type: string
 *                      example: kwer-2340vdf-sfdsg0dsg
 *                  accessToken:
 *                      type: string
 *                      example: dosifoeit43feovkd
 *                  refreshToken:
 *                      type: string
 *                      example: 0124932059435fkdsjgkfg
 *                  expiredAt:
 *                      type: number
 *                      example: 82148235259345
 *      401:
 *        description: Unauthorized(token is valid or is expired)
 *      500:
 *        description: Server Error
 */
authRouter.get("/api/auth/refresh-token", AuthController_1.default.refreshToken);
/**
 * @swagger
 * /api/auth/logout:
 *  get:
 *     tags: [auth]
 *     summary: Logout
 *     parameters:
 *       - in: query
 *         name: accessToken
 *         schema:
 *           type: string
 *         required: true
 *         description: Accesstoken for verification
 *     responses:
 *      200:
 *        description: Logout success
 *      500:
 *        description: Server Error
 */
authRouter.get("/api/auth/logout", AuthController_1.default.logout);
/**
 * @swagger
 * /api/auth/forget-password:
 *  get:
 *     tags: [auth]
 *     summary: Forget password
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email account for verification and send code for confirmation account
 *     responses:
 *      200:
 *        description: Success. please check your email for confirmation
 *      404:
 *        description: Email isn't registered
 *      500:
 *        description: Server Error
 */
authRouter.get("/api/auth/forget-password", AuthController_1.default.forgetPassword);
exports.default = authRouter;
