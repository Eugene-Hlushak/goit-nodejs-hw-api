const express = require("express");
const { contactSchemas } = require("../../models/contact");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers");
const {
  isValidId,
  validateContactData,
  validateContactFavorite,
} = require("../../middlewares");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", isValidId, getContactById);

router.post(
  "/",
  validateContactData(contactSchemas.addContactSchema),
  addContact
);

router.delete("/:contactId", isValidId, removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateContactData(contactSchemas.updContactSchema),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  validateContactFavorite(contactSchemas.updContactStatusSchema),
  updateStatusContact
);

module.exports = router;
