"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const middleware_1 = require("./middleware/middleware");
const Test_1 = __importDefault(require("./routes/Test"));
const SwaggerDocs_1 = require("./swagger/SwaggerDocs");
const AuthRoute_1 = __importDefault(require("./routes/AuthRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use(Test_1.default);
app.use(AuthRoute_1.default);
// app.use(commentRouter)
// app.use(postRouter)
// app.use(taggingRouter)
app.use(middleware_1.handlerExceptionMiddleWare);
(0, SwaggerDocs_1.setupSwagger)(app);
app.listen(PORT, () => {
    // const secretKey = `Let's Rock`; // Using this as a secret key
    // const token = jwt.sign({
    //   userId: 1
    // }, secretKey)
    // console.log(token)
    // console.log(new Date().getTime())
    // console.log(jwt.verify(token, secretKey)); // Log payload object in terminal
    // MailService.sendMail("quangphu2050@gmail.com", `Forget password email`, ForgetPasswordTemplate(random6Digit().toString(), 5))
    console.log("Server is listening at PORT: " + PORT);
});
