const { HttpError } = require("../services");

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
        next(HttpError(400, `Missing required ${missingField} field`));
      }
      if (type === "string.empty") {
        next(
          HttpError(400, `Field ${missingField} is not allowed to be empty`)
        );
      }
    }

    next();
  };
  return func;
};

const validateContactFavorite = (schema) => {
  const func = async (req, res, next) => {
    const keys = Object.keys(req.body);

    const isFavoriteField = keys.some((key) => key === "favorite");

    if (keys.length === 0 || (keys.length > 0 && !isFavoriteField)) {
      next(HttpError(400, "missing field favorite"));
    }
    if (keys.length > 1 && isFavoriteField) {
      next(HttpError(400, "leave only field favorite"));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      const missingField = error.details[0].context.key;
      const { type } = error.details[0];
      if (type === "boolean.base") {
        next(HttpError(400, `Field ${missingField} must be a boolean`));
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
      if (type === "any.required") {
        next(HttpError(400, `Missing required ${missingField} field`));
      }
      if (type === "string.empty") {
        next(
          HttpError(400, `Field ${missingField} is not allowed to be empty`)
        );
      }
      if (type === "any.only") {
        next(
          HttpError(
            400,
            `Field ${missingField} must be one of [starter, pro ,business]`
          )
        );
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
};
