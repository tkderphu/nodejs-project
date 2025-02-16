
import { createTransport } from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL || 'quangphu2060@gmail.com',
        pass: process.env.EMAIL_PASSWORD_APP || ''
    }
});

const mailOptions = (toEmail: string, subject: string, content: string) => {
    return {
        from: process.env.EMAIL,
        to: toEmail,
        subject: subject,
        html: content
    }
};


export class MailService {
    async sendMail(toEmail: string, subject: string, content: string) {
        const result = await transporter.sendMail(mailOptions(toEmail, subject, content))
        if (!result) {
            console.log("send mail error")
        } else {
            console.log("response: " + result.response)
        }
    }
}
export default new MailService()