const { ctrlWrapper } = require("../decorators/ctrlWrapper");
const { Contact, contactSchemas } = require("../models/contact");
const { HttpError, bodyValidation } = require("../services");

const checkContacts = async (body, owner) => {
  const { name, phone, email } = body;
  const contacts = await Contact.find({ owner });
  const check = contacts.find(
    (contact) =>
      contact.name === name ||
      contact.phone === phone ||
      contact.email === email
  );
  return check;
};

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page, limit, favorite = "" } = req.query;
  const skip = (page - 1) * limit;
  if (favorite === "true" || favorite === "false") {
    const filteredContacts = await Contact.find({ owner, favorite }, "-owner", {
      skip,
      limit,
    });
    res.json(filteredContacts);
  } else {
    const allContacts = await Contact.find({ owner }, "-owner", {
      skip,
      limit,
    });

    res.json(allContacts);
  }
};

const getContactById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await Contact.findById(id, "-owner");
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
  const { _id: owner } = req.user;
  const body = bodyValidation(contactSchemas.addContactSchema, req.body);

  const contactExist = await checkContacts(body, owner);
  if (contactExist) {
    throw HttpError(409, "Contact with similar data already exists");
  }

  const result = await Contact.create({ ...body, owner });
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
