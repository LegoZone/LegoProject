const url = require('url')
const redis = require('redis')

const redisUrl = url.parse('redis://redistogo:c63877801bb8b1b117b7d6cf50f93d7c@jack.redistogo.com:11753/')
const redisAuth = redisUrl.auth.split(':') || null
const redisPort = redisUrl.port || 6379
const redisHost = redisUrl.hostname || '127.0.0.1'
const redisDb = redisAuth[0] || null
const redisPass = redisAuth[1] || null

var onError = function (error) {
	console.error('Error in Redis client: ' + error.message);
	console.error(error.stack);
	console.log('Exiting now because of error in Redis client');
  // Our app doesn't work without DB. Exit.
  process.exit(1);
};

var onConnect =  function () {
	console.log('Successfully connected to Redis ' + redisHost + ':' + redisPort);
};

var redisClient = redis.createClient(redisPort, redisHost, {
	password: redisPass
});
redisClient.on('error', onError);
redisClient.on('connect', onConnect);

module.exports = redisClient


// const session = require('express-session')


// RedisStore = require('connect-redis')(session)
// module.exports.RedisStore = RedisStore 

// console.log('redistogo', process.env.REGION)

// const redisAuth = redisUrl.auth.split(':')
// server.set('redisHost', redisUrl.hostname)
// server.set('redisPort', redisUrl.port)
// server.set('redisDb', redisAuth[0])
// server.set('redisPass', redisAuth[1])

// server.use(session({
// 	secret: 'secret',
// 	store: new RedisStore({
// 		host: server.set('redisHost'),
// 		port: server.set('redisPort') || 6379,
// 		db: server.set('redisDb'),
// 		pass: server.set('redisPass')
// 	})
// }))

// const client = redis.createClient()

// client.on('error', (err) => {
// 	console.log("Error " + err);
// })

// client.on('connect', function() {
// 	console.log('connected to Redis');
// })

// module.exports = client

// if (process.env.REDISTOGO_URL) {
// 	var rtg   = require("url").parse(process.env.REDISTOGO_URL);
// 	var redis = require("redis").createClient(rtg.port, rtg.hostname);

// 	redis.auth(rtg.auth.split(":")[1]);
// } else {
// 	var redis = require("redis").createClient();
// }