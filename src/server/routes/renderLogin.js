module.exports = (req, res) => {
  if (req.query.error) {
    res.render('login', {
      error: req.query.error
    });
  } else {
    res.render('login');
  }
};
