import { Joi } from "express-validation";

export const registerValidation = Joi.object({
  firstName: Joi.string().required().alphanum().min(3).max(30),
  lastName: Joi.string().required().alphanum().min(3).max(30),
  interest: Joi.array().items(Joi.string()),
  email: Joi.string().email().required(),
  isAdmin: Joi.boolean(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  password_confirm: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export const eventValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  address: Joi.string().required(),
  isVirtual: Joi.string().required(),
  category: Joi.string().required(),
});
