const englishChars = /[a-zA-Z0-9]/;

const handleError = (file, res, message) => {
  res.render(file, {
    error: message
  });
};

const validateLogin = (username, password, res) => {
  if (!username.trim() || !password.trim()) {
    handleError('login', res, 'Please no white spaces');
  } else if (!englishChars.test(username) || !englishChars.test(password)) {
    handleError('login', res, 'Please use english characters and number only');
  } else {
    return;
  }
};

const validateSignup = (
  { username, email, password, confirmPassword },
  res
) => {
  if (!username.trim() || !password.trim() || !email.trim()) {
    handleError('admin', res, 'Please no white/empty spaces');
  } else if (!englishChars.test(username) || !englishChars.test(password)) {
    handleError('admin', res, 'Please use english characters and number only');
  } else if (password !== confirmPassword) {
    handleError('admin', res, 'Passwords do not match');
  } else {
    return;
  }
};
module.exports = {
  validateLogin,
  validateSignup,
  handleError
};
