const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),

  phone: Joi.string()
    .trim()
    .pattern(/^[-()\s\d+]+$/, "numbers")
    .min(7)
    .max(20)
    .required(),
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const updContactSchema = Joi.object({
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

const contactValidation = (schema, obj) => {
  const isValid = schema.validate(obj);
  return isValid.value;
};

module.exports = {
  contactValidation,
  addContactSchema,
  updContactSchema,
};
