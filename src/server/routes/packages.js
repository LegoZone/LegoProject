const packagesSchema = require('../model/schema.js').legoPack;

const fetchPackages = res => {
  const findAll = packagesSchema
    .find({})
    .exec()
    .then(packs => {
      res.render('packages', { packages: packs });
    })
    .catch(err => err);
};

module.exports = (req, res) => {
  fetchPackages(res);
};
