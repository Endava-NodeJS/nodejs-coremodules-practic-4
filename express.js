const sqlite3 = require("sqlite3")
const express = require("express")
const bodyParser = require('body-parser');
const app = express()

app.use(express.json({extended:true}))

const db = new sqlite3.Database("./tmp/database.db");
app.route("/notes")
.get(async (req,res)=>{
    const result = await db.get("SELECT * FROM todo")
    res.json(result).status(200)
})
.post((req,res)=>{
    const {title,content} = req.body
    db.run("INSERT INTO todo(title, content) values(?, ?)", title, content)
    res.send("Success").status(200)

})
.delete((req,res)=>{

})


app.listen(3000,()=>{
    console.log("listening on port 3000")
})