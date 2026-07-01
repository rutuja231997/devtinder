const validator = require("validator");

const validateSignUpData = (req) => {};

const validateEditProfileData = (req) => {
  const allowedFields = [
    "fistName",
    "lastName",
    "email",
    "password",
    "about",
    "age",
    "photoUrl",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) => {
    allowedFields.includes(field);
  });

  return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
