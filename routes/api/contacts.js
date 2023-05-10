const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  contactsPath,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts(contactsPath);
  res.json({
    status: "success",
    code: 200,
    data: { contacts },
  });
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
    const newContact = await addContact(contactsPath, req.body);
    res.status(201).json(newContact);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
