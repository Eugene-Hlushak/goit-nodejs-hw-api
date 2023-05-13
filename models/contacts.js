const path = require("path");
const {
  writeFile,
  generateNewId,
  findContact,
  getAllContacts,
  HttpError,
} = require("../services");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await getAllContacts(contactsPath);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getContactById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await findContact(contactsPath, id);
    if (!contact) {
      throw HttpError(404, "Not found");
    } else {
      res.json(contact);
    }
  } catch (error) {
    const { status = "500", message = "Server error" } = error;
    res.status(status).json({ message });
  }
};

const removeContact = async (path, contactId) => {
  const allContacts = await getAllContacts(path);
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
  const allContacts = await getAllContacts(path);
  const newContact = { id: await generateNewId(), ...body };
  const newContactsList = [...allContacts, newContact];

  await writeFile(path, newContactsList);
  return newContact;
};

const updateContact = async (path, contactId, body) => {
  const allContacts = await getAllContacts(path);
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
