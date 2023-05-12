const fs = require("fs/promises");
const nanoid = import("nanoid");

const getAllContacts = async (path) => {
  const buffer = await fs.readFile(path);
  return JSON.parse(buffer) || null;
};

const writeFile = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
};

const findContact = (contacts, id) =>
  contacts.find((contact) => contact.id === id);

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
  writeFile,
  generateNewId,
  findContact,
  checkContacts,
  checkMissingFields,
};
