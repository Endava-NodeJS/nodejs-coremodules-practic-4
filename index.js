const DB = require('./db');
const db = new DB('./notes.json');


const http = require('http');

const requestListener = function (req, res) {
  const value = db.get()
  res.writeHead(200);
  res.end(JSON.stringify(value));
}

const server = http.createServer(requestListener);
server.listen(8080);