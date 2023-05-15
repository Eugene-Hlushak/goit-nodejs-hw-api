const path = require("path");
const fs = require("fs/promises");
const { findContact, writeFile, generateNewId } = require("../services");

const contactsPath = path.join(__dirname, "contacts.json");

const getAllContacts = async () => {
  const buffer = await fs.readFile(contactsPath);
  return JSON.parse(buffer) || null;
};

const findContactById = async (contactId) => {
  const allContacts = await getAllContacts();
  const contact = findContact(allContacts, contactId);
  return contact;
};

const deleteContact = async (contactId) => {
  const allContacts = await getAllContacts();
  const deleted = findContact(allContacts, contactId);

  if (deleted) {
    const newContactsList = allContacts.filter(
      (contact) => contact.id !== contactId
    );
    await writeFile(contactsPath, newContactsList);
  }
  return deleted;
};

const createNewContact = async (body) => {
  const allContacts = await getAllContacts();
  const newContact = { id: await generateNewId(), ...body };
  const newContactsList = [...allContacts, newContact];

  await writeFile(contactsPath, newContactsList);
  return newContact;
};

const updContact = async (contactId, body) => {
  const allContacts = await getAllContacts();
  const contactToUpd = findContact(allContacts, contactId);
  const updatedContact = { ...contactToUpd, ...body };

  if (contactToUpd) {
    const updContactList = allContacts.reduce((acc, contact) => {
      if (contact.id !== contactId) {
        acc = [...acc, contact];
      } else {
        acc = [...acc, updatedContact];
      }
      return acc;
    }, []);
    await writeFile(contactsPath, updContactList);
  }
  return updatedContact;
};

module.exports = {
  getAllContacts,
  findContactById,
  deleteContact,
  createNewContact,
  updContact,
};
