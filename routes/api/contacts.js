const express = require("express");
const { contactSchemas } = require("../../models/contact");
const ctrl = require("../../controllers/conatctControllers");
const mw = require("../../middlewares");

const router = express.Router();

router.get("/", mw.authenticate, ctrl.listContacts);

router.get("/:contactId", mw.authenticate, mw.isValidId, ctrl.getContactById);

router.post(
  "/",
  mw.authenticate,
  mw.validateContactData(contactSchemas.addContactSchema),
  ctrl.addContact
);

router.delete("/:contactId", mw.authenticate, mw.isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  mw.authenticate,
  mw.isValidId,
  mw.validateContactData(contactSchemas.updContactSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  mw.authenticate,
  mw.validateContactFavorite(contactSchemas.updContactStatusSchema),
  ctrl.updateStatusContact
);

module.exports = router;
