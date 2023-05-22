const { ctrlWrapper } = require("../decorators/ctrlWrapper");
const { User, authSchemas } = require("../models/user");
const { HttpError, bodyValidation } = require("../services");
const bcrypt = require("bcrypt");

const signUp = async (req, res, next) => {
  const body = bodyValidation(authSchemas.signSchema, req.body);
  const { email, password } = body;
  const check = await User.findOne({ email });
  if (check) {
    throw HttpError(409, "message: Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const { subscription } = await User.create({
    ...body,
    password: hashPassword,
  });
  res.status(201).json({ user: { email, subscription } });
};

module.exports = {
  signUp: ctrlWrapper(signUp),
};
