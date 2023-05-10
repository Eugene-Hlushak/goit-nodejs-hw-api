const fs = require("fs/promises");
const path = require("path");
const {
  writeFile,
  generateNewId,
  findContact,
} = require("../services/services");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async (path) => {
  const buffer = await fs.readFile(path);
  return JSON.parse(buffer) || null;
};

const getContactById = async (path, contactId) => {
  const allContacts = await listContacts(path);
  const contact = findContact(allContacts, contactId);
  return contact;
};

const removeContact = async (path, contactId) => {
  const allContacts = await listContacts(path);
  const deleted = findContact(allContacts, contactId);
  if (deleted) {
    const newContactsList = allContacts.filter(
      (contact) => contact.id !== contactId
    );
    await writeFile(path, newContactsList);
  }
  return deleted;
};

const addContact = async (path, body) => {
  const allContacts = await listContacts(path);
  const newContact = { id: await generateNewId(), ...body };
  const newContactsList = [...allContacts, newContact];
  await writeFile(path, newContactsList);
  return newContact;
};

const updateContact = async (path, contactId, body) => {
  const allContacts = await listContacts(path);
  const contactToUpd = findContact(allContacts, contactId);
  const updContact = { ...contactToUpd, ...body };
  if (contactToUpd) {
    const updContactList = allContacts.reduce((acc, contact) => {
      if (contact.id !== contactId) {
        acc = [...acc, contact];
      } else {
        acc = [...acc, updContact];
      }
      return acc;
    }, []);
    await writeFile(path, updContactList);
  }
  return updContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  contactsPath,
};
