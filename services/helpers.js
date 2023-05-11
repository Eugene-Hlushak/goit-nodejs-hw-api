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

module.exports = {
  getAllContacts,
  writeFile,
  generateNewId,
  findContact,
  checkContacts,
};

// console.log(result);
// console.log("req.body --> ", req.body);
// console.log("name --> ", req.body.name);
// console.log("email --> ", req.body.email);
// console.log("phone --> ", req.body.phone);
// console.log("req.params --> ", req.params);
// console.log("req.query --> ", req.query);
