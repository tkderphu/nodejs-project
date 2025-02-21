"use strict";
const AccountConfirmationTemplate = (userFullName, confirmationLink) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            h2 {
                color: #333;
            }
            p {
                color: #555;
                font-size: 16px;
            }
            .button {
                display: inline-block;
                padding: 12px 20px;
                margin: 20px 0;
                background-color: #007bff;
                color: #ffffff;
                text-decoration: none;
                font-size: 18px;
                border-radius: 5px;
            }
            .button:hover {
                background-color: #0056b3;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Confirm Your Account</h2>
            <p>Hi <strong>${userFullName}</strong>,</p>
            <p>Thank you for signing up! Please confirm your email address to activate your account.</p>
            <a href="${confirmationLink}" class="button">Confirm My Account</a>
            <p>If the button above does not work, copy and paste the following link into your browser:</p>
            <p><a href="${confirmationLink}">${confirmationLink}</a></p>
            <p class="footer">If you did not create an account, you can ignore this email.</p>
            <p class="footer">Best regards, <br> Viosmash Support Team</p>
        </div>
    </body>
    </html>
    `;
};
