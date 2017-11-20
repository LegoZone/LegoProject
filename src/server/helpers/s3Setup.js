const AWS = require('aws-sdk')

AWS.config.region = 'us-west-2'
AWS.config.accessKeyId = 
AWS.config.secretAccessKey = 

const s3 = new AWS.S3()

module.exports = s3
