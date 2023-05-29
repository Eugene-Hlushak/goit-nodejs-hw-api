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
  authenticate,
} = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, listContacts);

router.get("/:contactId", authenticate, isValidId, getContactById);

router.post(
  "/",
  authenticate,
  validateContactData(contactSchemas.addContactSchema),
  addContact
);

router.delete("/:contactId", authenticate, isValidId, removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateContactData(contactSchemas.updContactSchema),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateContactFavorite(contactSchemas.updContactStatusSchema),
  updateStatusContact
);

module.exports = router;
