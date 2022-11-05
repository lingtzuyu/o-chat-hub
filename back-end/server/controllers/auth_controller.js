require('dotenv').config();

const register = async (req, res) => {
  res.status(200).send({ message: 'Register route ' });
};

const login = async (req, res) => {
  res.status(200).send({ message: 'Login route ' });
};

module.exports = {
  register,
  login,
};
