export const validateInputFormat = ({ mail, password }) => {
  const isMailFormat = validateInputMail(mail);
  const isPasswordFormat = validateInputPassword(password);

  return isMailFormat && isPasswordFormat;
};

export const validateSignupInputFormat = ({ mail, username, password }) => {
  const isMailFormat = validateInputMail(mail);
  const isPasswordFormat = validateInputPassword(password);
  const isUsernameFormat = validateInputUsername(username);

  return isMailFormat && isPasswordFormat && isUsernameFormat;
};

// return if the password length is correct
export const validateInputPassword = (password) => {
  return password.length >= 8 && password.length <= 20;
};

export const validateInputUsername = (username) => {
  return username.length >= 8 && username.length <= 20;
};

export const validateInputMail = (mail) => {
  const mailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return mailFormat.test(mail);
};

// export fail: https://stackoverflow.com/questions/45995136/export-default-was-not-found
// https://stackoverflow.com/questions/71112113/react-js-export-problems-possible-exports-default
