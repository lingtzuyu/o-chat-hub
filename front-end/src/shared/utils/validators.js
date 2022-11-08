const validateInputFormat = ({ mail, password }) => {
  const isMailFormat = validateInputMail(mail);
  const isPasswordFormat = validateInputPassword(password);

  return isMailFormat && isPasswordFormat;
};

const validateSignupInputFormat = ({ mail, username, password }) => {
  const isMailFormat = validateInputMail(mail);
  const isPasswordFormat = validateInputPassword(password);
  const isUsernameFormat = validateInputUsername(username);

  return isMailFormat && isPasswordFormat && isUsernameFormat;
};

// return if the password length is correct
const validateInputPassword = (password) => {
  return password.length >= 8 && password.length <= 20;
};

const validateInputUsername = (username) => {
  return username.length >= 8 && username.length <= 20;
};

const validateInputMail = (mail) => {
  const mailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return mailFormat.test(mail);
};

export { validateInputFormat, validateSignupInputFormat };
