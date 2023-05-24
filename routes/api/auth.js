const express = require("express");
const router = express.Router();
const { register, login, logout, currentUser } = require("../../controllers");
const { validateUserData, authenticate } = require("../../middlewares");
const { authSchemas } = require("../../models/user");

router.post(
  "/register",

  validateUserData(authSchemas.signSchema),
  register
);

router.post(
  "/login",

  validateUserData(authSchemas.signSchema),
  login
);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, currentUser);
module.exports = router;
