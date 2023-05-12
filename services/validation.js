const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30),

  phone: Joi.string()
    .trim()
    .pattern(/^[-()\s\d+]+$/, "numbers")
    .min(7)
    .max(20),
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
});

const updateContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30),
  phone: Joi.string()
    .trim()
    .pattern(/^[-()\s\d+]+$/, "numbers")
    .min(7)
    .max(20),
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
});

const addContactValidation = (obj) => {
  const isValid = addContactSchema.validate(obj);
  return isValid;
};

const updateContactValidation = (obj) => {
  const isValid = updateContactSchema.validate(obj);
  return isValid;
};

module.exports = {
  addContactValidation,
  updateContactValidation,
};
