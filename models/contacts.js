const {
  getAllContacts,
  writeFile,
  generateNewId,
} = require("../services/services");

const listContacts = async (path) => await getAllContacts(path);

const getContactById = async (path, contactId) => {
  const allContacts = await listContacts(path);

  const contact = allContacts.find((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (path, contactId) => {
  const allContacts = await getAllContacts(path);
  const deleted = allContacts.find((contact) => contact.id === contactId);
  const newContactsList = allContacts.filter(
    (contact) => contact.id !== contactId
  );
  console.log(`Contact ${deleted.name} was succesfully deleted! `);
  await writeFile(path, newContactsList);
};

const addContact = async (path, body) => {
  const allContacts = await getAllContacts(path);
  const check = allContacts.find(
    (contact) =>
      contact.name === body.name ||
      contact.email === body.email ||
      contact.phone === body.phone
  );
  if (check) {
    console.log("There is already exist the contact with the same data");
    return console.table(allContacts);
  }
  const newContactsList = [
    ...allContacts,
    { ...body, id: await generateNewId() },
  ];
  await writeFile(path, newContactsList);
};

const updateContact = async (path, contactId, body) => {
  const allContacts = getAllContacts(path);
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
};
