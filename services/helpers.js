const fs = require("fs/promises");
const nanoid = import("nanoid");

const writeFile = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
};

const findContact = (all, id) => {
  const contact = all.find((one) => one.id === id);
  return contact;
};

const generateNewId = async () => (await nanoid).nanoid();

const checkContacts = async (contact, getAll) => {
  const { name, email, phone } = contact;

  const contacts = await getAll();
  const check = contacts.find(
    (contact) =>
      contact.name === name ||
      contact.email === email ||
      contact.phone === phone
  );
  return check;
};

module.exports = {
  findContact,
  checkContacts,
  generateNewId,
  writeFile,
};
