const { ctrlWrapper } = require("../decorators/ctrlWrapper");
const { authSchemas } = require("../models/user");
const { nanoid } = require("nanoid");
const help = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const service = require("../services/usersServices");
const { SENDER_EMAIL, SECRET_KEY, PROJECT_URL } = process.env;

// register

const register = async (req, res, next) => {
  // console.log(req.body);
  const { user, body } = await service.getUser(req.body);

  if (user) {
    throw help.HttpError(409);
  }

  const avatar = gravatar.url(body.email);

  const hashPassword = await bcrypt.hash(body.password, 10);

  const verificationToken = nanoid();

  const { email, subscription } = await service.createNewUser(
    body,
    hashPassword,
    avatar,
    verificationToken
  );

  const verifyEmail = help.createVerifyEmail(
    email,
    SENDER_EMAIL,
    PROJECT_URL,
    verificationToken
  );

  await help.sendVerifyEmail(verifyEmail);

  res.status(201).json({ user: { email, subscription } });
};

// login

const login = async (req, res, next) => {
  const { user, body } = await service.getUser(req.body);
  if (!user) {
    throw help.HttpError(401, "Email or password is wrong");
  }

  const isMatch = await bcrypt.compare(body.password, user.password);
  if (!isMatch) {
    throw help.HttpError(401, "Email or password is wrong");
  }

  const { email, subscription } = user;
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await service.loginUser(user._id, token);

  res.status(200).json({ token, user: { email, subscription } });
};

// logout

const logout = async (req, res, next) => {
  const { _id: id } = req.user;
  await service.logoutUser(id, "");
  res.status(204).json("");
};

// current user

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

// upd subscription

const updateSubscription = async (req, res) => {
  const body = help.bodyValidation(authSchemas.subscriptionSchema, req.body);
  const { _id: id } = req.user;

  const { email, subscription } = await service.updSubscription(
    id,
    body.subscription
  );
  res.status(200).json({ user: { email, subscription } });
};

// change avatar

const changeAvatar = async (req, res, next) => {
  const { _id: id } = req.user;
  const { path: tmpUpload, originalname } = req.file;

  const avatarsDir = path.join(__dirname, "../", "public", "avatars");
  const newFileName = `${id}_${originalname}`;
  const destinationUpload = path.join(avatarsDir, newFileName);

  await help.resizeAvatarImg(tmpUpload);

  await fs.rename(tmpUpload, destinationUpload);

  const avatarUrl = path.join("avatars", newFileName);
  await service.editAvatar(id, avatarUrl);
  res.status(200).json({ avatarUrl });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  changeAvatar: ctrlWrapper(changeAvatar),
};
