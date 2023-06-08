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

const createVerifyEmail = (to, from, url, token) => {
  return {
    to,
    from,
    subject: "Verify email",
    html: `<a target="_blank" href="${url}/users/verify/${token}">Click to verify your email address</a>`,
  };
};

const sendVerifyEmail = async (to, from, url, token) => {
  const email = createVerifyEmail(to, from, url, token);
  console.log("sent email --> ", email);
  await transport.sendMail(email);
};

module.exports = sendVerifyEmail;
