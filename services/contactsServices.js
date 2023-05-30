const { Contact } = require("../models/contact");

const getAllContacts = async (owner, skip, limit) =>
  await Contact.find({ owner }, "-owner", {
    skip,
    limit,
  });

const getFilteredContacts = async (owner, favorite, skip, limit) =>
  await Contact.find({ owner, favorite }, "-owner", {
    skip,
    limit,
  });

const getContact = async (id) => await Contact.findById(id, "-owner");

const deleteContact = async (id) => await Contact.findByIdAndRemove(id);

const createContact = async (body, owner) =>
  await Contact.create({ ...body, owner });

const updContact = async (id, body) =>
  await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });

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

module.exports = {
  getAllContacts,
  getFilteredContacts,
  getContact,
  deleteContact,
  createContact,
  updContact,
  checkContacts,
};
