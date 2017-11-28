const { users } = require('../model/schema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateLogin, handleError } = require('../helpers/validation.js');
require('env2')('config.env');

module.exports = async ({ body }, res) => {
  const { username, password } = body;

  try {
    validateLogin(username, password, res);
    const user = await users.find({ username });
    if (user.length === 0) {
      handleError('login', res, 'This user does not exist');
    } else {
      const comparision = await bcrypt.compare(password, user[0].password);

      if (!comparision) {
        handleError('login', res, 'The password that you typed is incorrect');
      } else {
        const token = jwt.sign(user[0].username, process.env.JWT_SECRET);
        res.cookie('token', token, {
          maxAge: 604800000
        });
        res.redirect('/packages');
      }
    }
  } catch (err) {
    handleError('login', res, 'Something went wrong please try again');
  }
};
