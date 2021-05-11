const yargs = require("yargs");
const fs = require("fs").promises;

const filePath = "notes.json";
yargs
  .command({
    command: "read",
    describe: "reads notes",
    handler: async function () {
      const data = (await fs.readFile(filePath)).toString();
      const parsedData = JSON.parse(data);
      parsedData[0].notes.forEach((note) =>
        console.log(`Title:${note.title},Content:${note.content}`)
      );
    },
  })
  .command({
    command: "edit",
    describe: "edits the content of the notes by title",
    handler: async ({ title = "", content = "" }) => {
      try {
        const data = (await fs.readFile(filePath)).toString();
        const parsedData = JSON.parse(data);
        const notes = parsedData[0].notes;
        const found = notes.find((v) => v.title === title);
        if (found) {
          found.content = content;
        }
        const changedData = JSON.stringify(parsedData);
        fs.writeFile(filePath, changedData).then(() =>
          console.log(`File Changed:${JSON.stringify(found)}`)
        );
      } catch (e) {
        console.error(e);
      }
    },
  })
  .command({
    command: "add",
    describe: "Adds a new note or edits existing",
    handler: async ({ title = "", content = "" }) => {
      try {
        const data = (await fs.readFile(filePath)).toString();
        const parsedData = JSON.parse(data);
        const notes = parsedData[0].notes;
        const found = notes.find((v) => v.title === title);
        if (found) {
          found.content = content;
        } else {
          notes.push({ title, content });
        }
        const message = found
          ? `Edited Message:${JSON.stringify(found)}`
          : `Added Message:${JSON.stringify({ title, content })}`;

        const changedData = JSON.stringify(parsedData);
        fs.writeFile(filePath, changedData).then(() => console.log(message));
      } catch (e) {
        console.error(e);
      }
    },
  })
  .command({
    command: "remove",
    describe: "Removes an note by title",
    handler: async ({ title = "" }) => {
      try {
        const data = (await fs.readFile(filePath)).toString();
        const parsedData = JSON.parse(data);
        const notes = parsedData[0].notes;
        const found = notes.find((v) => v.title === title);
        if (found) {
          const index = notes.indexOf(found);
          if (index > -1) {
            notes.splice(index, 1);
          }
        }
        const changedData = JSON.stringify(parsedData);
        fs.writeFile(filePath, changedData).then(() =>
          console.log(`Remove Item:${JSON.stringify(found)}`)
        );
      } catch (e) {
        console.error(e);
      }
    },
  }).demandOption(["title"]);

yargs.parse();
