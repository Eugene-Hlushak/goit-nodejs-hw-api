const { isValidId } = require("./isValidId");
const {
  validateContactData,
  validateContactFavorite,
  validateUserData,
} = require("./validateData");
const authenticate = require("./authenticate");

module.exports = {
  isValidId,
  validateContactData,
  validateContactFavorite,
  validateUserData,
  authenticate,
};
