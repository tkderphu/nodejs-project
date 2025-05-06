export const ForgetPasswordTemplate = (code, expiredMinute) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <title>Forgot Password Code</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                text-align: center;
            }
            .container {
                background-color: #fff;
                padding: 30px;
                margin: 20px auto;
                width: 400px;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            h2 {
                color: #333;
                margin-bottom: 20px;
            }
            p {
                color: #555;
                margin-bottom: 20px;
            }
            .code {
                font-size: 24px;
                font-weight: bold;
                color: #007bff;
                margin-bottom: 20px;
            }
            button {
                background-color: #007bff;
                color: #fff;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Forgot Password?</h2>
            <p>Enter the code below to reset your password:</p>
            <div class="code">
                ${code}
            </div>
            <p>This code will expire in ${expiredMinute} minutes.</p>
            <button>Reset Password</button>
        </div>
    </body>
    </html>`;
};
