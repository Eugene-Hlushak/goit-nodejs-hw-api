const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../services");

const isValidId = (req, res, next) => {
  const id = req.params.contactId;
  if (!isValidObjectId(id)) {
    next(HttpError(404, `Not found`));
  }
  next();
};

module.exports = {
  isValidId,
};
