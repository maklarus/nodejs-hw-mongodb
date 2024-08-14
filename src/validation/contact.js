import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should be at least {#limit}',
    'string.max': 'Name should be at most {#limit}',
    'any.required': 'Name should be exist',
  }),
  phoneNumber: Joi.number().required(),
  email: Joi.string().email().required(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
});

export const updateContactValidateSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  phoneNumber: Joi.number().optional(),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('work', 'home', 'personal').optional(),
});
