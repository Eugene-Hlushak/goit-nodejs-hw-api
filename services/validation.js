const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  phone: Joi.string()
    .pattern(/^[-0-9]+$/, "numbers")
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),

  phone: Joi.string().pattern(/^[-0-9]+$/, "numbers"),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const addContactValidation = (obj) => {
  const isError = addContactSchema.validate(obj);
  if (isError.error) {
    const errorMessage = isError.error.details[0].message;
    return errorMessage;
  }
};

const updateContactValidation = (obj) => {
  const isValid = updateContactSchema.validate(obj);
  if (isValid.error) {
    const errorMessage = isValid.error.details[0].message;
    return errorMessage;
  }
};

module.exports = {
  addContactValidation,
  updateContactValidation,
};
