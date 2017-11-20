const server = require('./server.js').server

server.listen(9000, function(){
  console.log('listening on :9000');
})
