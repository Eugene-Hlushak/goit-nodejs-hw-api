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
  checkContacts,
  addContactValidation,
  updateContactValidation,
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
  const isValid = addContactValidation(req.body);

  try {
    if (isValid.error) {
      const errorMessage = isValid.error.details[0].message;
      throw HttpError(400, errorMessage);
    } else {
      const data = isValid.value;
      const check = await checkContacts(contactsPath, data);

      if (check) {
        throw HttpError(
          400,
          `There is already exist contact with the same data. Name = ${check.name}`
        );
      } else {
        const newContact = await addContact(contactsPath, data);
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
  const { name, phone, email } = req.body;
  try {
    if (!name && !email && !phone) {
      throw HttpError(400, "missing fields");
    } else {
      const isValid = updateContactValidation(req.body);
      if (isValid.error) {
        const errorMessage = isValid.error.details[0].message;
        throw HttpError(400, errorMessage);
      } else {
        const id = req.params.contactId;
        const updContact = await updateContact(contactsPath, id, isValid.value);
        if (!updContact) {
          throw HttpError(404, "Not found");
        } else {
          res.json(updContact);
        }
      }
    }
  } catch (error) {
    const { status = "500", message = "Server error" } = error;
    res.status(status).json({ message });
  }
});

module.exports = router;
