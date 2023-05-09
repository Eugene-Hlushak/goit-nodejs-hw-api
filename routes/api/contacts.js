const express = require("express");
const { listContacts, getById } = require("../../services/services");
const { contactsPath } = require("../../contacts/contactsPath");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json(await listContacts(contactsPath));
});

router.get("/:contactId", async (req, res, next) => {
  console.log("req.baseUrl --> ", req.baseUrl);
  console.log("req.method --> ", req.method);
  console.log("req.url --> ", req.url);
  console.log("req.body --> ", req.body);
  console.log("req.params --> ", req.params);
  console.log("req.query --> ", req.query);
  const id = req.params.contactId;
  const contact = await getById(contactsPath, id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  console.log("req.baseUrl --> ", req.baseUrl);
  console.log("req.method --> ", req.method);
  console.log("req.url --> ", req.url);
  console.log("req.body --> ", req.body);
  console.log("req.params --> ", req.params);
  console.log("req.query --> ", req.query);
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
