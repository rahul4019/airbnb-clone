const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text, html=None ) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        if (html){
            await transporter.sendMail({
                from: process.env.USER,
                to: email,
                subject: subject,
                text: text,
                html: html
            });
        }
        else{
            await transporter.sendMail({
                from: process.env.USER,
                to: email,
                subject: subject,
                text: text,
            });
        }

        console.log("email sent sucessfully");
        return true;
    } catch (error) {
        console.log(error, "email not sent");
        return false;
    }
};

module.exports = sendEmail;