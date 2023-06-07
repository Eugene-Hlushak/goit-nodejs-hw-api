const nodemailer = require("nodemailer");
const { UKR_NET_PASS, SENDER_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: SENDER_EMAIL,
    pass: UKR_NET_PASS,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendVerifyEmail = async (data) => {
  const email = { ...data, from: SENDER_EMAIL };
  await transport.sendMail(email);
};

module.exports = sendVerifyEmail;
