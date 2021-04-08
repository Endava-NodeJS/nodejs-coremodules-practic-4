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
        case "POST":
          req.on("data",(body)=>{
              const data = body.toString();
              const parsedData = JSON.parse(data)
              db.add(parsedData)
              res.write("Added Note with success")
          })
           break
      default:
        console.log('in default')
    }
  }
  res.end();
}

const server = http.createServer(requestListener);
server.listen(8089);