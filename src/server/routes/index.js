const router = require('express').Router();

const homepage = require('./homepage.js');
const packages = require('./packages.js');
const { legoHandler } = require('./lego.js');
const redisRequest = require('./redis_request.js');

router.get('/', homepage);
router.get('/packages', packages);
router.get('/lego', legoHandler);
router.post('/redisRequest', redisRequest);

module.exports = router;
