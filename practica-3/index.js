const DB = require("./db");
const db = new DB("./notes.json");

const http = require("http");

const requestListener = function (req, res) {
  res.setHeader("Content-Type", "text/json");
  if (req.url && req.url.includes("notes")) {
    if (req.url === "/notes") {
      switch (req.method) {
        case "GET":
          const value = db.get();
          res.write(JSON.stringify(value));
          break;
        case "POST":
          req.on("data", (body) => {
            const data = body.toString();
            const parsedData = JSON.parse(data);
            db.add(parsedData);
            res.write("Added new Note");
          });
          
          break;
        default:
          console.log("in strict default");
      }
    } else {
        const splitUrl = req.url.split("/");
        const id = splitUrl[splitUrl.length - 1];
      switch (req.method) {
        case "GET":
          const value = db.get(id);
          res.write(JSON.stringify(value));
          break;
        case "DELETE":
          res.setHeader("Content-Type", "text/plain");
          db.delete(id);
          res.write("Deleted Note Successfully");
        case "PUT":
          req.on("data", (body) => {
            const data = body.toString();
            const parsedData = JSON.parse(data);
            db.update({...parsedData,id})
            res.write("Updated note successfully");
          });
          break;
        default:
          console.log("i non-strict default");
      }
    }
  }
  res.end();
};

const server = http.createServer(requestListener);
server.listen(8089);
