const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

var ws = new WebSocket("ws://ep17.com/api/socket?uuid=" + uuidv4());
console.log("init connection...")


ws.on('open', function open() {
  console.log("opened...")
});

ws.on('message', function incoming(data) {
  console.log(data);
});ws.onopen = function() {
  ws.send(JSON.stringify({message: "hello server!"}))
}

ws.on('error', function error(event) {
  console.debug(event)
});

ws.on('close', function (err) {
  console.log('Connection closed: '+ err);
});
