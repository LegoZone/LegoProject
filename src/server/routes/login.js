const { users } = require('../model/schema.js');
const bcrypt = require('bcrypt');

function handleError(res, message) {
  res.render('login', {
    error: message
  });
}

function validate(username, password, res) {
  const englishChars = /[a-zA-Z0-9]/;

  if (!username.trim() || !password.trim()) {
    handleError(res, 'Please no white spaces');
  } else if (!englishChars.test(username) || !englishChars.test(password)) {
    handleError(res, 'Please use english characters and number only');
  } else {
    return;
  }
}

module.exports = async ({ body }, res) => {
  const { username, password } = body;

  try {
    validate(username, password, res);
    const user = await users.find({ username });
    if (user.length === 0) {
      handleError(res, 'This user does not exist');
    } else {
      const comparision = await bcrypt.compare(password, user[0].password);

      if (!comparision) {
        handleError(res, 'The password that you typed is incorrect');
      } else {
        res.cookie('token', user[0].username, { maxAge: 604800000 });
        res.redirect('/packages');
      }
    }
  } catch (err) {
    handleError(res, 'Something went wrong please try again');
  }
};
