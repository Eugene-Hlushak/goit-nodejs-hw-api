const { isValidId } = require("./isValidId");
const {
  validateContactData,
  validateContactFavorite,
  validateUserData,
} = require("./validateData");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  isValidId,
  validateContactData,
  validateContactFavorite,
  validateUserData,
  authenticate,
  upload,
};
