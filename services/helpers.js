const fs = require("fs/promises");
const nanoid = import("nanoid");

const getAllContacts = async (path) => {
  const buffer = await fs.readFile(path);
  return JSON.parse(buffer) || null;
};

const writeFile = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
};

const findContact = async (path, contactId) => {
  const allContacts = await getAllContacts(path);
  const contact = allContacts.find(({ id }) => id === contactId);
  return contact;
};

const deleteContact = async (path, contactId) => {
  const allContacts = await getAllContacts(path);
  const deleted = allContacts.find(({ id }) => id === contactId);

  if (deleted) {
    const newContactsList = allContacts.filter(
      (contact) => contact.id !== contactId
    );
    await writeFile(path, newContactsList);
  }
  return deleted;
};

const createNewContact = async (path, body) => {
  const allContacts = await getAllContacts(path);
  const newContact = { id: await generateNewId(), ...body };
  const newContactsList = [...allContacts, newContact];

  await writeFile(path, newContactsList);
  return newContact;
};

const updContact = async (path, contactId, body) => {
  const allContacts = await getAllContacts(path);
  const contactToUpd = allContacts.find(({ id }) => id === contactId);
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
    await writeFile(path, updContactList);
  }
  return updatedContact;
};

const generateNewId = async () => (await nanoid).nanoid();

const checkContacts = async (path, contact) => {
  const { name, email, phone } = contact;

  const contacts = await getAllContacts(path);
  const check = contacts.find(
    (contact) =>
      contact.name === name ||
      contact.email === email ||
      contact.phone === phone
  );
  return check;
};

const setMessage = (field) => `missing required ${field} field`;

const checkMissingFields = (obj) => {
  const { name, email, phone } = obj;
  if (!name) {
    return setMessage("name");
  }
  if (!email) {
    return setMessage("email");
  }
  if (!phone) {
    return setMessage("phone");
  }
};

module.exports = {
  getAllContacts,
  findContact,
  checkContacts,
  checkMissingFields,
  deleteContact,
  createNewContact,
  updContact,
};
