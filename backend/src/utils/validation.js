const validator = require("validator");

const validateSignUpData = (req) => {};

const validateEditProfileData = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "about",
    "age",
    "photoUrl",
    "contact",
    "gender",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) => {
    allowedFields.includes(field);
  });

  if (!isEditAllowed) {
    throw new Error("Invalid edit request");
  }

  if (isEditAllowed.valueOf("skills") > 10) {
    throw new Error("Skills can not be more than 10");
  }

  return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
