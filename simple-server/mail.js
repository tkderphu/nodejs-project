
const nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "quangphu2060@gmail.com",
        pass: 'your pass'
    }
})

var mailOptions = {
    from: 'quangphu2060@gmail.com',
    to: 'quangphu2050@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
        console.log(err)
    } else {
        console.log("message sent: " + info.response)
    }
})

console.log("hello world")