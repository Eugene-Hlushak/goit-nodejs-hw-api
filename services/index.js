const { HttpError } = require("./HttpError");
const {
  getAllContacts,
  writeFile,
  generateNewId,
  findContact,
  checkContacts,
  checkMissingFields,
} = require("./helpers");
const {
  addContactValidation,
  updateContactValidation,
} = require("./validation");

module.exports = {
  HttpError,
  getAllContacts,
  writeFile,
  generateNewId,
  findContact,
  checkContacts,
  addContactValidation,
  updateContactValidation,
  checkMissingFields,
};

// const { name, phone, email } = isValid.value;
// const isMissingField = checkMissingFields(isValid.value);
// try {
//   if (isMissingField) {
//     throw HttpError(400, isMissingField);
//   }
