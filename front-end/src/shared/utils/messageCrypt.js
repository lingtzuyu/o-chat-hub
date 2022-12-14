import CryptoJS from 'crypto-js';
const key = process.env.REACT_APP_MESSAGE_KEY;

const EncryptMessage = (message) => {
  return CryptoJS.AES.encrypt(message, key).toString();
};

const DecryptMessage = (message) => {
  return CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8);
};

export { EncryptMessage, DecryptMessage };
