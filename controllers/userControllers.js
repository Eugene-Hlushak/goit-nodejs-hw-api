const { ctrlWrapper } = require("../decorators/ctrlWrapper");
const { User, authSchemas } = require("../models/user");
const { HttpError, bodyValidation } = require("../services");
const bcrypt = require("bcrypt");

async function getUser(data) {
  const body = bodyValidation(authSchemas.signSchema, data);
  const user = await User.findOne({ email: body.email });
  return { user, body };
}

const signUp = async (req, res, next) => {
  const { user, body } = await getUser(req.body);
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(body.password, 10);
  const { email, subscription } = await User.create({
    ...body,
    password: hashPassword,
  });
  res.status(201).json({ user: { email, subscription } });
};

const logIn = async (req, res, next) => {
  const { user, body } = await getUser(req.body);

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const isMatch = await bcrypt.compare(body.password, user.password);
  if (!isMatch) {
    throw HttpError(401, "Email or password is wrong");
  }
  const { email, subscription } = user;

  res
    .status(200)
    .json({ token: "exampletoken", user: { email, subscription } });
};

module.exports = {
  signUp: ctrlWrapper(signUp),
  logIn: ctrlWrapper(logIn),
};
