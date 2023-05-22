const express = require("express");
const router = express.Router();
const { signUp } = require("../../controllers");
const { validateUserData } = require("../../middlewares");
const { authSchemas } = require("../../models/user");

router.post("/register", validateUserData(authSchemas.signSchema), signUp);

module.exports = router;
