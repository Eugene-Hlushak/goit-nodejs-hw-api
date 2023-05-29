const express = require("express");
const router = express.Router();
const { upload } = require("../../multer");
const {
  register,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  changeAvatar,
} = require("../../controllers");
const { validateUserData, authenticate } = require("../../middlewares");
const { authSchemas } = require("../../models/user");

router.post(
  "/register",

  validateUserData(authSchemas.userJoiSchema),
  register
);

router.post(
  "/login",

  validateUserData(authSchemas.userJoiSchema),
  login
);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, getCurrentUser);

router.patch(
  "/",
  authenticate,
  validateUserData(authSchemas.subscriptionSchema),
  updateSubscription
);

router.patch("/avatar", authenticate, upload.single("avatar"), changeAvatar);
module.exports = router;
