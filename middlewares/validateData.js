const { HttpError } = require("../helpers");

const missingFieldMessage = "Missing required field -";
const emptyFieldMessage = " field is not allowed to be empty";

const validateContactData = (schema) => {
  const func = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, "missing fields"));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      const missingField = error.details[0].context.key;
      const { type } = error.details[0];
      if (type === "any.required") {
        next(HttpError(400, `${missingFieldMessage} ${missingField}`));
      }
      if (type === "string.empty") {
        next(HttpError(400, `${missingField} ${emptyFieldMessage}`));
      }
    }

    next();
  };
  return func;
};

const validateContactFavorite = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const { type } = error.details[0];
      const missingField = error.details[0].context.key;
      switch (type) {
        case "boolean.base":
          next(HttpError(400, `Field ${missingField} must be a boolean`));
          break;
        default:
          next(HttpError(400, `${missingFieldMessage} ${missingField}`));
      }
    }
    next();
  };
  return func;
};

const validateUserData = (schema) => {
  const func = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, "missing fields"));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      const missingField = error.details[0].context.key;

      const { type } = error.details[0];
      switch (type) {
        case "any.only":
          next(
            HttpError(
              400,
              `Field ${missingField} must be one of [starter, pro ,business]`
            )
          );
          break;
        case "string.empty":
          next(HttpError(400, `${missingField} ${emptyFieldMessage}`));
          break;
        default:
          next(HttpError(400, `${missingFieldMessage} ${missingField}`));
      }
    }
    next();
  };
  return func;
};

const validateUserEmail = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const missingField = error.details[0].context.key;
      const { type } = error.details[0];
      switch (type) {
        case "any.required":
          next(HttpError(400, `${missingFieldMessage} ${missingField}`));
          break;
        case "string.empty":
          next(HttpError(400, `${missingField} ${emptyFieldMessage}`));
          break;
        default:
          next(HttpError(400, `your ${missingField} is not valid`));
      }
    }

    next();
  };
  return func;
};

module.exports = {
  validateContactData,
  validateContactFavorite,
  validateUserData,
  validateUserEmail,
};
