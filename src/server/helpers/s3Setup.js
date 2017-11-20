const AWS = require('aws-sdk')

AWS.config.region = 'us-west-2'
AWS.config.accessKeyId = 'AKIAIOWNN7P5A5LKSQXQ'
AWS.config.secretAccessKey = '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'

const s3 = new AWS.S3()

module.exports = s3