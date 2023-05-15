const { ctrlWrapper } = require("../decorators/ctrlWrapper");
const {
  getAllContacts,
  findContactById,
  deleteContact,
  createNewContact,
  updContact,
} = require("../models/contacts");
const {
  HttpError,
  contactValidation,
  checkContacts,
  updContactSchema,
  addContactSchema,
} = require("../services");

const listContacts = async (req, res) => {
  const contacts = await getAllContacts();
  res.json(contacts);
};

const getContactById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await findContactById(id);
  if (!contact) {
    throw HttpError(404, "Not found");
  } else {
    res.json(contact);
  }
};

const removeContact = async (req, res, next) => {
  const id = req.params.contactId;
  const deletedContact = await deleteContact(id);
  if (!deletedContact) {
    throw HttpError(404, "Not found");
  } else {
    res.json({ message: "contact deleted" });
  }
};

const addContact = async (req, res, next) => {
  const contactBody = contactValidation(addContactSchema, req.body);
  const check = await checkContacts(contactBody, getAllContacts);

  if (check) {
    throw HttpError(
      400,
      `There is already exist contact with the same data. Name = ${check.name}`
    );
  } else {
    const newContact = await createNewContact(contactBody);
    res.status(201).json(newContact);
  }
};

const updateContact = async (req, res, next) => {
  const contactBody = contactValidation(updContactSchema, req.body);
  const id = req.params.contactId;
  const updatedContact = await updContact(id, contactBody);
  if (!updatedContact) {
    throw HttpError(404, "Not found");
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
};
