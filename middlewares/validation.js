const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateId = Joi.string().custom((value, helpers) => {
  if (validator.isValid(value)) {
    return value;
  }
  return helpers.message('Неверный id');
});

const vaidateEmail = Joi.string().required().email();
const vaidatePassword = Joi.string().required().min(8);
const vaidateInfo = Joi.string().min(2).max(30);
const vaidateLink = Joi.string().pattern(/^(http|https):\/\/(www\.)?[\S]+\.[\w]+#?/);

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: vaidateEmail,
    password: vaidatePassword,
    name: vaidateInfo,
    about: vaidateInfo,
    avatar: vaidateLink,
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: vaidateEmail,
    password: vaidatePassword,
  }),
});

module.exports.validateUserById = celebrate({
  params: Joi.object().keys({
    userId: validateId,
  }),
});

module.exports.validateCardById = celebrate({
  params: Joi.object().keys({
    cardId: validateId,
  }),
});

module.exports.validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: vaidateInfo,
    about: vaidateInfo,
  }),
});

module.exports.validateupdateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: vaidateLink,
  }),
});

module.exports.validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: vaidateLink,
  }),
});
