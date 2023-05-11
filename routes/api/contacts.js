const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  contactsPath,
} = require("../../models/contacts");
const {
  HttpError,
  // getAllContacts,
  checkContacts,
  addContactValidation,
} = require("../../services");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts(contactsPath);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await getContactById(contactsPath, id);
    if (!contact) {
      throw HttpError(404, "Not found");
    } else {
      res.json(contact);
    }
  } catch (error) {
    const { status = "500", message = "Server error" } = error;
    res.status(status).json({ message });
  }
});

router.post("/", async (req, res, next) => {
  const { name, phone, email } = req.body;
  try {
    const isError = addContactValidation(req.body);
    ``;
    if (isError) {
      throw HttpError(400, isError);
    } else {
      const check = await checkContacts(contactsPath, name, email, phone);

      if (check) {
        throw HttpError(
          400,
          `There is already exist contact with the same data. Name = ${check.name}`
        );
      } else {
        const newContact = await addContact(contactsPath, req.body);
        res.status(201).json(newContact);
      }
    }
  } catch (error) {
    const { status = "500", message = "Server error" } = error;
    res.status(status).json({ message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const deletedContact = await removeContact(contactsPath, id);
    if (!deletedContact) {
      throw HttpError(404, "Not found");
    } else {
      res.json({ message: "contact deleted" });
    }
  } catch (error) {
    const { status = "500", message = "Server error" } = error;
    res.status(status).json(message);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const { name, phone, email } = req.body;

    if (!name && !email && !phone) {
      throw HttpError(400, "missing fields");
    } else {
      const updContact = await updateContact(contactsPath, id, req.body);
      if (!updContact) {
        res.status(404).json({ message: "Not found" });
      } else {
        res.json(updContact);
      }
    }
  } catch (error) {
    const { status = "500", message = "Server error" } = error;
    res.status(status).json({ message });
  }
});

module.exports = router;
