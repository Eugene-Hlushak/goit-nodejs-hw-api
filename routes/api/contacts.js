const express = require("express");
const { schemas } = require("../../models/contact");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/controllers");
const {
  isValidId,
  validateContactData,
  validateContactFavorite,
} = require("../../middlewares");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateContactData(schemas.addContactSchema), addContact);

router.delete("/:contactId", isValidId, removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateContactData(schemas.updContactSchema),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  validateContactFavorite(schemas.updContactStatusSchema),
  updateStatusContact
);

module.exports = router;
