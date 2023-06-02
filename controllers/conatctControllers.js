const { ctrlWrapper } = require("../decorators/ctrlWrapper");
const { contactSchemas } = require("../models/contact");
const { HttpError, bodyValidation } = require("../helpers");
const service = require("../services/contactsServices");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (favorite === "true" || favorite === "false") {
    const filteredContacts = await service.getFilteredContacts(
      owner,
      favorite,
      skip,
      limit
    );
    res.json(filteredContacts);
  } else {
    const allContacts = await service.getAllContacts(owner, skip, limit);
    res.json(allContacts);
  }
};

const getContactById = async (req, res, next) => {
  const id = req.params.contactId;

  const contact = await service.getContact(id);
  if (!contact) throw HttpError(404);
  res.json(contact);
};

const removeContact = async (req, res, next) => {
  const id = req.params.contactId;

  const result = await service.deleteContact(id);
  if (!result) {
    throw HttpError(404);
  } else {
    res.json({ message: "contact deleted" });
  }
};

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const body = bodyValidation(contactSchemas.addContactSchema, req.body);
  const contactExist = await service.checkContacts(body, owner);

  if (contactExist) {
    throw HttpError(409, "Contact with similar data already exists");
  }

  const result = await service.createContact(body, owner);
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const body = bodyValidation(contactSchemas.updContactSchema, req.body);

  const id = req.params.contactId;
  const updatedContact = await service.updContact(id, body);
  if (!updatedContact) {
    throw HttpError(404);
  } else {
    res.json(updatedContact);
  }
};

const updateStatusContact = async (req, res, next) => {
  const body = bodyValidation(contactSchemas.updContactStatusSchema, req.body);

  const id = req.params.contactId;
  const updatedContact = await service.updContact(id, body);

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
