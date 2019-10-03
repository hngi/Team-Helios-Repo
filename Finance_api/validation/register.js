import Validator from 'validator';
import spaceTrimer from './spaceTrimer';

module.exports = function validateRegisterInput(data) {
  const errors = {};
  const alphabetRegex = /^[A-Za-z ]+$/;
  // Convert empty fields to an empty string so we can use validator functions
  const name = spaceTrimer(data.name);
  const email = spaceTrimer(data.email);
  const password = spaceTrimer(data.password);
  const password2 = spaceTrimer(data.password2);

  // Name checks
  if (!alphabetRegex.test(name)) {
    errors
      .name = 'Name should be an alphabet';
  }
  if (!Validator.isLength(name, { min: 4, max: 30 })) {
    errors.name = 'Name should be at least 4 characters long';
  }
  // Email checks
  if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }
  // Password checks
  if (!Validator.isLength(password, { min: 5, max: 30 })) {
    errors.password = 'Password must be at least 5 characters';
  }
  if (password !== password2) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
