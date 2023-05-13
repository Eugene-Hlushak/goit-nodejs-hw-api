const path = require("path");
const {
  findContact,
  getAllContacts,
  HttpError,
  deleteContact,
  createNewContact,
  checkContacts,
  checkMissingFields,
  contactValidation,
  updContact,
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

const removeContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const deletedContact = await deleteContact(contactsPath, id);
    if (!deletedContact) {
      throw HttpError(404, "Not found");
    } else {
      res.json({ message: "contact deleted" });
    }
  } catch (error) {
    const { status = "500", message = "Server error" } = error;
    res.status(status).json({ message });
  }
};

const addContact = async (req, res, next) => {
  try {
    const isValid = contactValidation(req.body);
    const isMissingField = checkMissingFields(req.body);

    if (isMissingField) {
      throw HttpError(400, isMissingField);
    } else if (isValid.error) {
      const errorMessage = isValid.error.details[0].message;
      throw HttpError(400, errorMessage);
    } else {
      const data = isValid.value;
      const check = await checkContacts(contactsPath, data);

      if (check) {
        throw HttpError(
          400,
          `There is already exist contact with the same data. Name = ${check.name}`
        );
      } else {
        const newContact = await createNewContact(contactsPath, data);
        res.status(201).json(newContact);
      }
    }
  } catch (error) {
    const { status = "500", message = "Server error" } = error;
    res.status(status).json({ message });
  }
};

const updateContact = async (req, res, next) => {
  try {
    const isValid = contactValidation(req.body);
    const { name, phone, email } = isValid.value;
    if (!name && !email && !phone) {
      throw HttpError(400, "missing fields");
    } else {
      if (isValid.error) {
        const errorMessage = isValid.error.details[0].message;
        throw HttpError(400, errorMessage);
      } else {
        const id = req.params.contactId;
        const updatedContact = await updContact(
          contactsPath,
          id,
          isValid.value
        );
        if (!updatedContact) {
          throw HttpError(404, "Not found");
        } else {
          res.json(updatedContact);
        }
      }
    }
  } catch (error) {
    const { status = "500", message = "Server error" } = error;
    res.status(status).json({ message });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
