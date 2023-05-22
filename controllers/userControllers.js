const { ctrlWrapper } = require("../decorators/ctrlWrapper");
const { User, authSchemas } = require("../models/user");
const { HttpError, bodyValidation } = require("../services");

const signUp = async (req, res, next) => {
  const body = bodyValidation(authSchemas.signSchema, req.body);
  const { email } = body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "message: Email in use");
  }
  const newUser = await User.create(body);
  res.status(201).json({ newUser });
};

module.exports = {
  signUp: ctrlWrapper(signUp),
};
