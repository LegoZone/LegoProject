const redisClient = require('../helpers/redisSetup.js');
const { packageInfo } = require('./lego.js');

const mtlExt = 'mtl',
  objExt = 'obj';

let response;

const fetchFromRedis = (objUrlId, mtlUrlId, cb) => {
  let packageId = packageInfo.name;
  redisClient.hmget(packageId, objUrlId, mtlUrlId, cb);
};

const handleRedisResponse = (err, data) => {
  if (err) {
    throw err;
  } else if (finishedLoadingUrls(data)) {
    allLegoWasLoaded();
  } else if (!finishedLoadingUrls(data)) {
    sendUrlsToClient(data);
  }
};

const sendUrlsToClient = data => {
  let objURL = data[0],
    mtlURL = data[1];
  response.json({ objURL, mtlURL });
};

const allLegoWasLoaded = () => {
  return response.json({ finished: true });
};

const finishedLoadingUrls = data => {
  if (data[0] === null) {
    return true;
  }
};

module.exports = (req, res) => {
  response = res;
  let objUrlId = `${objExt}${req.body.id}`;
  let mtlUrlId = `${mtlExt}${req.body.id}`;
  fetchFromRedis(objUrlId, mtlUrlId, handleRedisResponse);
};
