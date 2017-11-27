const AWS = require('aws-sdk');

AWS.config.region = process.env.REGION;
AWS.config.accessKeyId = process.env.ACCESSKEYID;
AWS.config.secretAccessKey = process.env.SECRETACCESSKEY;

const s3 = new AWS.S3();

module.exports = s3;
