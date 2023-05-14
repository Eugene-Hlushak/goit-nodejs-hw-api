const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/controllers");
const { addContactSchema, updContactSchema } = require("../../services");
const { validateContactData } = require("../../decorators/validateContactData");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", validateContactData(addContactSchema), addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateContactData(updContactSchema), updateContact);

module.exports = router;
