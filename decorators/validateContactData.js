const { HttpError } = require("../services");

const validateContactData = (schema) => {
  const func = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, "missing fields"));
    }
    console.log(schema);
    const { error } = schema.validate(req.body);
    if (error) {
      const missingField = error.details[0].context.key;
      const type = error.details[0].type;

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

module.exports = {
  validateContactData,
};
