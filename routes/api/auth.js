const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  currentUser,
  updateSubscription,
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

router.get("/current", authenticate, currentUser);

router.patch(
  "/",
  authenticate,
  validateUserData(authSchemas.subscriptionSchema),
  updateSubscription
);
module.exports = router;
