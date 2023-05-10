const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  contactsPath,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts(contactsPath);
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(contactsPath, id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const { name, phone, email } = req.body;

  // console.log("req.body --> ", req.body);
  // console.log("name --> ", req.body.name);
  // console.log("email --> ", req.body.email);
  // console.log("phone --> ", req.body.phone);
  // console.log("req.params --> ", req.params);
  // console.log("req.query --> ", req.query);
  if (!name || !email || !phone) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    const contacts = await listContacts(contactsPath);
    const check = contacts.find(
      (contact) =>
        contact.name === name ||
        contact.email === email ||
        contact.phone === phone
    );
    if (check) {
      console.log(check);
      res.status(400).json({
        message: `There is already exist contact with the same data - id = ${check.id}`,
      });
    } else {
      const newContact = await addContact(contactsPath, req.body);
      res.status(201).json(newContact);
    }
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const deletedContact = await removeContact(contactsPath, id);
  console.log(deletedContact);
  if (deletedContact) {
    res.json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  console.log("req.body --> ", req.body);
  const id = req.params.contactId;
  const { name, phone, email } = req.body;

  if (!name && !email && !phone) {
    res.status(400).json({ message: "missing fields" });
  } else {
    const updContact = await updateContact(contactsPath, id, req.body);
    if (!updContact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(updContact);
    }
  }
});

module.exports = router;
