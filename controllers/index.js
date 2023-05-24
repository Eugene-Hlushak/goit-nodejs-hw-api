const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("./conatctControllers");

const { register, login, logout, currentUser } = require("./userControllers");

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
  register,
  login,
  logout,
  currentUser,
};
