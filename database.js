const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const server = async () => {
  const db = await open({
    filename: "./tmp/database.db",
    driver: sqlite3.Database,
  });
  const title = 'Test2 Title';
  const content = 'test content';
  await db.exec(
    "CREATE TABLE IF NOT EXISTS todo (title TEXT UNIQUE, content TEXT, id INTEGER NOT NULL PRIMARY KEY)"
  );
  await db.run(
    'INSERT INTO todo(title, content) values(?, ?)',
      title,
      content,
  );
};

server();

