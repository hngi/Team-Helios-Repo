"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _validator = _interopRequireDefault(require("validator"));

var _spaceTrimer = _interopRequireDefault(require("./spaceTrimer"));

module.exports = function validateRegisterInput(data) {
  var errors = {};
  var alphabetRegex = /^[A-Za-z ]+$/; // Convert empty fields to an empty string so we can use validator functions

  var name = (0, _spaceTrimer["default"])(data.name);
  var email = (0, _spaceTrimer["default"])(data.email);
  var password = (0, _spaceTrimer["default"])(data.password);
  var password2 = (0, _spaceTrimer["default"])(data.password2); // Name checks

  if (!alphabetRegex.test(name)) {
    errors.name = 'Name should be an alphabet';
  }

  if (!_validator["default"].isLength(name, {
    min: 4,
    max: 30
  })) {
    errors.name = 'Name should be at least 4 characters long';
  } // Email checks


  if (!_validator["default"].isEmail(email)) {
    errors.email = 'Email is invalid';
  } // Password checks


  if (!_validator["default"].isLength(password, {
    min: 5,
    max: 30
  })) {
    errors.password = 'Password must be at least 5 characters';
  }

  if (password !== password2) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors: errors,
    isValid: Object.keys(errors).length === 0
  };
};
//# sourceMappingURL=register.js.map