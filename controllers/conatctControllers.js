const { ctrlWrapper } = require("../decorators/ctrlWrapper");
const { Contact, contactSchemas } = require("../models/contact");
const { HttpError, bodyValidation } = require("../services");

const listContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getContactById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);
  if (!contact) throw HttpError(404);
  res.json(contact);
};

const removeContact = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404);
  } else {
    res.json({ message: "contact deleted" });
  }
};

const addContact = async (req, res, next) => {
  const body = bodyValidation(contactSchemas.addContactSchema, req.body);
  const result = await Contact.create(body);
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const body = bodyValidation(contactSchemas.updContactSchema, req.body);
  const id = req.params.contactId;
  const updatedContact = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404);
  } else {
    res.json(updatedContact);
  }
};

const updateStatusContact = async (req, res, next) => {
  const body = bodyValidation(contactSchemas.updContactStatusSchema, req.body);
  const id = req.params.contactId;
  const updatedContact = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404);
  } else {
    res.json(updatedContact);
  }
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
