const bcrypt = require('bcrypt');
const { validateSignup, handleError } = require('../helpers/validation.js');
const Users = require('../model/schema.js').users;

module.exports = async ({ body }, res) => {
  const { username, email, password, confirmPassword } = body;
  validateSignup({ username, email, password, confirmPassword }, res);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Users({
      username,
      email,
      password: hashedPassword
    });
    user.save(error => {
      if (error) {
        if (error.message.indexOf('email') > -1) {
          handleError('admin', res, 'The email already exists in our database');
        } else if (error.message.indexOf('username') > -1) {
          handleError(
            'admin',
            res,
            'The username already exists in our database'
          );
        }
      } else
        res.render('login', {
          error: 'user has been added',
          success: true
        });
    });
  } catch (err) {
    console.log(err);
    handleError('admin', res, 'Something went wrong please try again');
  }
};
