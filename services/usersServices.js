const { User, authSchemas } = require("../models/user");
const { bodyValidation } = require("../helpers");

async function getUserByEmail(data) {
  const body = bodyValidation(authSchemas.userJoiSchema, data);
  const user = await User.findOne({ email: body.email });
  return { user, body };
}

async function getUserByVerifyToken(token) {
  const user = await User.findOne({ verificationToken: token });
  return user;
}

const createNewUser = async (body, hashPassword, avatar, verificationToken) =>
  await User.create({
    ...body,
    password: hashPassword,
    avatarUrl: avatar,
    verificationToken,
  });

const loginUser = async (id, token) =>
  await User.findByIdAndUpdate(id, { token });

const logoutUser = async (id, token) =>
  await User.findByIdAndUpdate(id, { token });

const updSubscription = async (id, data) =>
  await User.findByIdAndUpdate(
    id,
    {
      subscription: data,
    },
    { new: true }
  );

const editAvatar = async (id, avatarUrl) =>
  await User.findByIdAndUpdate(id, { avatarUrl });

const verifyUser = async (verificationToken) =>
  await User.findOneAndUpdate(
    { verificationToken },
    { verify: true, verificationToken: "" },
    { new: true }
  );

module.exports = {
  getUserByEmail,
  getUserByVerifyToken,
  createNewUser,
  loginUser,
  logoutUser,
  updSubscription,
  editAvatar,
  verifyUser,
};
