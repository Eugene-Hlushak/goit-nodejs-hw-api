const express = require("express");
const router = express.Router();
const { signUp, logIn } = require("../../controllers");
const { validateUserData } = require("../../middlewares");
const { authSchemas } = require("../../models/user");

router.post("/register", validateUserData(authSchemas.signSchema), signUp);

router.post("/login", validateUserData(authSchemas.signSchema), logIn);
module.exports = router;
