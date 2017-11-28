const jwt = require('jsonwebtoken');
require('env2')('config.env');

module.exports = async (req, res, next) => {
  const tokenCookie = req.cookies.token;
  if (!tokenCookie) {
    res.redirect('/login?error=Please login');
  } else {
    try {
      const encryptedData = await jwt.verify(
        tokenCookie,
        process.env.JWT_SECRET
      );
      return next();
    } catch (err) {
      res.redirect('/login?error=Please login');
    }
  }
};
