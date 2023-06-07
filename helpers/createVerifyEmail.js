const createVerifyEmail = (to, from, url, token) => {
  const verifyEmail = {
    to,
    from,
    subject: "Verify email",
    html: `<a target="_blank" href="${url}/verify/${token}">Click to verify your email address</a>`,
  };
  return verifyEmail;
};

module.exports = createVerifyEmail;
