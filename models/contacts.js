const fs = require("fs/promises");
const path = require("path");
const { writeFile, generateNewId } = require("../services/services");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async (path) => {
  const buffer = await fs.readFile(path);
  return JSON.parse(buffer) || null;
};

const getContactById = async (path, contactId) => {
  const allContacts = await listContacts(path);

  const contact = allContacts.find((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (path, contactId) => {
  const allContacts = await listContacts(path);
  const newContactsList = allContacts.filter(
    (contact) => contact.id !== contactId
  );
  await writeFile(path, newContactsList);
};

const addContact = async (path, body) => {
  const allContacts = await listContacts(path);
  // const check = allContacts.find(
  //   (contact) =>
  //     contact.name === body.name ||
  //     contact.email === body.email ||
  //     contact.phone === body.phone
  // );
  // if (check) {
  //   return console.table(allContacts);
  // }
  const newContact = { id: await generateNewId(), ...body };
  const newContactsList = [...allContacts, newContact];
  await writeFile(path, newContactsList);
  console.log("New contact list -->", newContactsList);
  return newContact;
};

const updateContact = async (path, contactId, body) => {
  const allContacts = listContacts(path);
  const updContactList = allContacts.reduce((acc, contact) => {
    if (contact.id !== contactId) {
      acc = { ...acc, contact };
    } else {
      const updContact = { ...contact, ...body };
      acc = { ...acc, updContact };
    }
    return acc;
  }, {});

  await writeFile(path, updContactList);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  contactsPath,
};
