const express = require("express");
const router = express.Router();
const { register, login } = require("../../controllers");
const { validateUserData, } = require("../../middlewares");
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

// router.post("/logout",authenticate, logout);
module.exports = router;
