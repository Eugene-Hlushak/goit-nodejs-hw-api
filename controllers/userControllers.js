const { ctrlWrapper } = require("../decorators/ctrlWrapper");
const { User, authSchemas } = require("../models/user");
const { HttpError, bodyValidation } = require("../services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const { avatarsDir } = require("../multer");

const { SECRET_KEY } = process.env;

async function getUser(data) {
  const body = bodyValidation(authSchemas.userJoiSchema, data);
  const user = await User.findOne({ email: body.email });
  return { user, body };
}

const register = async (req, res, next) => {
  const { user, body } = await getUser(req.body);

  if (user) {
    throw HttpError(409);
  }
  const avatar = gravatar.url(body.email);
  console.log(avatar);
  const hashPassword = await bcrypt.hash(body.password, 10);
  const { email, subscription } = await User.create({
    ...body,
    password: hashPassword,
    avatarUrl: avatar,
  });
  res.status(201).json({ user: { email, subscription } });
};

const login = async (req, res, next) => {
  const { user, body } = await getUser(req.body);
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const isMatch = await bcrypt.compare(body.password, user.password);
  if (!isMatch) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { email, subscription } = user;
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({ token, user: { email, subscription } });
};

const logout = async (req, res, next) => {
  const { _id: id } = req.user;
  const user = await User.findByIdAndUpdate(id, { token: "" });
  if (!user) {
    throw HttpError(401);
  } else {
    res.status(204).json("");
  }
};

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  const body = bodyValidation(authSchemas.subscriptionSchema, req.body);
  const { _id: id } = req.user;

  const user = await User.findByIdAndUpdate(
    id,
    {
      subscription: body.subscription,
    },
    { new: true }
  );
  if (!user) {
    throw HttpError(401);
  } else {
    const { email, subscription } = user;
    res.status(200).json({ user: { email, subscription } });
  }
};

const changeAvatar = async (req, res, next) => {
  const { path: tmpUpload, originalname } = req.file;
  const destinationUpload = path.join(avatarsDir, originalname);
  await fs.rename(tmpUpload, destinationUpload);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  changeAvatar: ctrlWrapper(changeAvatar),
};
