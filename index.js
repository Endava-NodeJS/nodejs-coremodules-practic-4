const DB = require('./db');
const db = new DB('./notes.json');


const http = require('http');

const requestListener = function (req, res) {
  res.setHeader('Content-Type', 'text/json');
  if(req.url && req.url === '/notes') {
    switch (req.method){
      case 'GET':
        const value = db.get()
        res.write(JSON.stringify(value));
        break;
      default:
        console.log('in default')
    }
  }
  res.end();
}

const server = http.createServer(requestListener);
server.listen(8089);