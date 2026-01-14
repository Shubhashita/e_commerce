const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().required().messages({ "any.required": "Name is required" }),
    email: Joi.string().email().required().messages({ "any.required": "Valid email is required" }),
    password: Joi.string().min(6).required().messages({ "any.required": "Password must be at least 6 characters long" }),
    role: Joi.string().valid('user', 'admin').optional()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({ "any.required": "Valid email is required" }),
    password: Joi.string().required().messages({ "any.required": "Password is required" }),
});

module.exports = { userSchema, loginSchema };