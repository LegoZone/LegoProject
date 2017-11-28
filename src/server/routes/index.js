const router = require('express').Router();

// controllers
const homepage = require('./homepage.js');
const packages = require('./packages.js');
const { legoHandler } = require('./lego.js');
const redisRequest = require('./redis_request.js');
const signupHandler = require('./signup.js');
const loginHandler = require('./login.js');
const renderLoginHandler = require('./renderLogin');

// middleware
const authenticate = require('../middleware/authenticate.js');

// routes
router.get('/', homepage);
router.get('/admin', (req, res) => res.render('admin'));
router.post('/admin', signupHandler);
router.get('/login', renderLoginHandler);
router.post('/login', loginHandler);
router.get('/packages', packages);
router.get('/lego', authenticate, legoHandler);
router.post('/redisRequest', redisRequest);

module.exports = router;
