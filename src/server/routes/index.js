const router = require('express').Router();

const homepage = require('./homepage.js');
const packages = require('./packages.js');
const { legoHandler } = require('./lego.js');
const redisRequest = require('./redis_request.js');
const adminHandler = require('./admin.js');
const loginHandler = require('./login.js');

router.get('/', homepage);
router.get('/admin', adminHandler);
router.get('/login', (req, res) => res.render('login'));
router.post('/login', loginHandler);
router.get('/packages', packages);
router.get('/lego', legoHandler);
router.post('/redisRequest', redisRequest);

module.exports = router;
