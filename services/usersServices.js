const { User, authSchemas } = require("../models/user");
const { bodyValidation } = require("../helpers");

async function getUser(data) {
  const body = bodyValidation(authSchemas.userJoiSchema, data);
  const user = await User.findOne({ email: body.email });
  return { user, body };
}

const createNewUser = async (body, hashPassword, avatar) =>
  await await User.create({
    ...body,
    password: hashPassword,
    avatarUrl: avatar,
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

module.exports = {
  getUser,
  createNewUser,
  loginUser,
  logoutUser,
  updSubscription,
  editAvatar,
};
