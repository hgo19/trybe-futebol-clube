import Joi = require('joi');

const MUST_BE_FILLED = 'All fields must be filled';

export const emailSchema = Joi.string().empty().email({ tlds: { allow: false } }).required()
  .messages({
    'any.required': MUST_BE_FILLED,
    'string.empty': MUST_BE_FILLED,
  });

export const passwordSchema = Joi.string().empty().required()
  .messages({
    'any.required': MUST_BE_FILLED,
    'string.empty': MUST_BE_FILLED,
  });

export const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});
