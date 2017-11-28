const server = require('./server.js').server;
const mongoose = require('mongoose');
require('env2')('config.env');

mongoose.Promise = require('bluebird');

mongoose.connect(process.env.DB_URL, {
  useMongoClient: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('connected to mongodb');
  server.listen(process.env.PORT || 9000, () => {
    console.log('listening on :9000');
  });
});
