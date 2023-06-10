const { isValidId } = require("./isValidId");
const {
  validateContactData,
  validateContactFavorite,
  validateUserData,
  validateUserEmail,
} = require("./validateData");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  isValidId,
  validateContactData,
  validateContactFavorite,
  validateUserData,
  validateUserEmail,
  authenticate,
  upload,
};
