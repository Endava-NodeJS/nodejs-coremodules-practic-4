const DB = require('./db');
const db = new DB('./notes.json');

console.log(db.get());
