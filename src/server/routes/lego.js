const s3 = require('../helpers/s3Setup.js');
const redisClient = require('../helpers/redisSetup.js');

const packageInfo = { name: '', length: 0 },
  week = 604800,
  mtlExt = 'mtl',
  objExt = 'obj',
  datExt = '.dat.';

let response;

const loadPackage = (req, res) => {
  attachResponse(res);
  attachPackageInfo(req.query, checkRedisCache);
};

const attachResponse = res => {
  response = res;
};

const attachPackageInfo = (data, cb) => {
  packageInfo.name = data.name;
  packageInfo.length = data.length;
  cb(getFromRedis);
};

const checkRedisCache = cb => {
  const packageId = packageInfo.name;
  const urlName = `${objExt}${packageInfo.length}`;
  cb(packageId, urlName, handleRedisResult);
};

const getFromRedis = (packageId, urlName, cb) => {
  redisClient.hmget(packageId, urlName, cb);
};

const handleRedisResult = (err, url) => {
  if (err) {
    throw err;
  } else if (urlInCache(url)) {
    renderLego();
  } else if (!urlInCache(url)) {
    getFromS3(renderLego);
  }
};

const urlInCache = url => {
  return url[0];
};

const setParams = (brickNumber, extension) => {
  return (params = {
    Bucket: packageInfo.name,
    Key: `${brickNumber}${datExt}${extension}`,
    Expires: week
  });
};

const getFromS3 = cb => {
  for (
    let brickNumber = 1;
    brickNumber <= packageInfo.length;
    brickNumber = brickNumber + 2
  ) {
    let mtlParams = setParams(brickNumber, mtlExt);
    let objParams = setParams(brickNumber, objExt);
    getSignedUrls(mtlParams, packageInfo.name, brickNumber, mtlExt);
    getSignedUrls(objParams, packageInfo.name, brickNumber, objExt);
  }
  cb();
};

const getSignedUrls = (params, packageName, brickNumber, extension) => {
  s3.getSignedUrl('getObject', params, (err, signedUrl) => {
    if (err) {
      throw err;
    } else {
      let urlName = `${extension}${brickNumber}`;
      let urlData = signedUrl;
      cacheUrlsInRedis(packageName, urlName, urlData);
    }
  });
};

const cacheUrlsInRedis = (packageName, urlName, urlData) => {
  redisClient.hmset(packageName, [urlName, urlData]);
};

const renderLego = () => {
  return response.render('lego');
};

module.exports.legoHandler = (req, res) => {
  loadPackage(req, res);
};

module.exports.packageInfo = packageInfo;
