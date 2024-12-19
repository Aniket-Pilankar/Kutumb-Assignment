import Joi from 'joi';

export const loginValidation = Joi.object({
  username: Joi.string().required().messages({
    'string.base': `Username should be a type of 'text'`,
    'string.empty': `Username cannot be an empty field`,
    'any.required': `Username is a required field`,
  }),
  otp: Joi.number()
    .integer()
    .min(1000) // Minimum 4-digit number
    .max(9999) // Maximum 4-digit number
    .required()
    .messages({
      'number.base': `OTP should be a type of 'number'`,
      'number.min': `OTP should be a 4-digit number`,
      'number.max': `OTP should be a 4-digit number`,
      'any.required': `OTP is a required field`,
    }),
});
