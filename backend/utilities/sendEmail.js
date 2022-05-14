const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_TRANSPORTER_HOST,
    port: process.env.EMAIL_TRANSPORTER_PORT,
    auth: {
      user: process.env.EMAIL_TRANSPORTER_USER,
      pass: process.env.EMAIL_TRANSPORTER_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SEND_FROM}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(message);
};
module.exports = sendEmail;
