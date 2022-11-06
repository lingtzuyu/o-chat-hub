require('dotenv').config();

const multer = require('multer');

const { promisify } = require('util'); // util from native nodejs library

const wrapAsync = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
};

module.exports = {
  wrapAsync,
};
