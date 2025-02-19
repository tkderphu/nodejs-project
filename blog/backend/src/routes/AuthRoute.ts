import { Router } from "express";
import AuthController from "../app/controller/AuthController";
const authRouter = Router()


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
authRouter.post('/api/auth/login', AuthController.login)

// authRouter.post("/api/auth/register", AuthController.register)

// authRouter.get("/api/auth/refresh-token", AuthController.refreshToken)

// authRouter.get("/api/auth/logout", AuthController.logout)

// authRouter.get("/api/auth/forget-password", AuthController.forgetPassword)


export default authRouter