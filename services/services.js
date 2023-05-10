const fs = require("fs/promises");
const nanoid = import("nanoid");

// const getAllContacts = async (path) => {
//   const buffer = await fs.readFile(path);
//   return JSON.parse(buffer) || null;
// };

const writeFile = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
};

const generateNewId = async () => (await nanoid).nanoid();

module.exports = {
  // getAllContacts,
  writeFile,
  generateNewId,
};
