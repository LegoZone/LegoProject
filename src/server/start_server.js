const server = require('./server.js').server;

server.listen(process.env.PORT || 9000, () => {
  console.log('listening on :9000');
});
