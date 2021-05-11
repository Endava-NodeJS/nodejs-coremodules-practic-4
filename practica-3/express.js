const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const express = require("express");
const app = express();
const config = {
  filename: "./tmp/database.db",
  driver: sqlite3.Database,
};
const dbConnection = () => open(config)
app.use(express.json({ extended: true }));
app
  .route("/notes")
  .get(async (req, res) => {
    const db = await dbConnection()
    const result = await db.all("SELECT * FROM todo");
    res.json(result).status(200);
  })
  .post(async (req, res) => {
    const db = await dbConnection()
    const { title, content } = req.body;
    db.run("INSERT INTO todo(title, content) values(?, ?)", title, content);
    res.send("Success").status(200);
  });

app
  .route("/notes/:id")
  .get(async (req, res) => {
    const noteId = req.params.id;
    const db = await dbConnection()
    const note = await db.get("SELECT * FROM todo WHERE id=?", noteId);
    res.json(note).status(200);
  })
  .delete(async (req, res) => {
    const noteId = req.params.id;
    const db = await dbConnection()
    await db.run("DELETE FROM todo WHERE id=?", noteId);
    res.send("success").status(200);
  })
  .put(async (req, res) => {
    const noteId = req.params.id;
    const db = await dbConnection()
    const { title, content } = req.body;
    await db.run(
      "UPDATE todo SET title=?, content=? WHERE id=?",
      title,
      content,
      noteId
    );
    res.send("Success").status(204);
  });

app.listen(3000, () => {
  console.log("listening on port 3000");
});
