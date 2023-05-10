const fs = require("fs/promises");
const nanoid = import("nanoid");

const writeFile = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
};

const findContact = (contacts, id) =>
  contacts.find((contact) => contact.id === id);
const generateNewId = async () => (await nanoid).nanoid();

module.exports = {
  writeFile,
  generateNewId,
  findContact,
};
