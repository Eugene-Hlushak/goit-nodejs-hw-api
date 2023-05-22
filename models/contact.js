const { Schema, model } = require("mongoose");
const { mongooseErrorHandler } = require("../services");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
  }
);

contactSchema.post("save", mongooseErrorHandler);

const Contact = model("contact", contactSchema);

const addContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .trim()
    .pattern(/^[-()\s\d+]$/, "numbers")
    .min(7)
    .max(20)
    .required(),
});

const updContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30),
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  phone: Joi.string()
    .trim()
    .pattern(/^[-()\s\d+]$/, "numbers")
    .min(7)
    .max(20),
});

const updContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactSchemas = {
  addContactSchema,
  updContactSchema,
  updContactStatusSchema,
};

module.exports = { Contact, contactSchemas };
