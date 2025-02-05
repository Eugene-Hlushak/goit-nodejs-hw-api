const { Schema, model } = require("mongoose");
const { mongooseErrorHandler } = require("../helpers");
const Joi = require("joi");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    token: String,
    avatarUrl: String,
  },
  {
    versionKey: false,
  }
);

userSchema.post("save", mongooseErrorHandler);

const User = model("user", userSchema);

const userJoiSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().trim().min(6).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().trim().valid("starter", "pro", "business"),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const authSchemas = {
  userSchema,
  userJoiSchema,
  subscriptionSchema,
  verifyEmailSchema,
};

module.exports = { User, authSchemas };
