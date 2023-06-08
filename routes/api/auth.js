const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/userControllers");
const mw = require("../../middlewares");
const { authSchemas } = require("../../models/user");

router.post(
  "/register",

  mw.validateUserData(authSchemas.userJoiSchema),
  ctrl.register
);

router.get("/verify/:verificationToken", ctrl.verifyUserEmail);

router.post(
  "/login",

  mw.validateUserData(authSchemas.userJoiSchema),
  ctrl.login
);

router.post("/logout", mw.authenticate, ctrl.logout);

router.get("/current", mw.authenticate, ctrl.getCurrentUser);

router.patch(
  "/",
  mw.authenticate,
  mw.validateUserData(authSchemas.subscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  mw.authenticate,
  mw.upload.single("avatar"),
  ctrl.changeAvatar
);

module.exports = router;
