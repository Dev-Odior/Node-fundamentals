const fs = require("fs/promises");
const { Buffer } = require("buffer");

(async () => {
  const watcher = fs.watch("./command.txt");

  // command
  const CREATE_FILE = "create a file";
  const RENAME_FILE = "rename file";
  const DELETE_FILE = "delete a file";
  const ADD_TO_FILE = "add to the file";

  const createFile = async (filePath) => {
    try {
      let existingFile = await fs.open(filePath, "r");
      existingFile.close();

      return console.log("File with this name already exist");
    } catch (error) {
      const newFileHandler = await fs.open(filePath, "w");
      console.log("A new file was successfully created");
      newFileHandler.close();
    }
  };

  const deleteFile = async (filePath) => {
    await fs.unlink(filePath, (err) => {
      if (err) {
        console.log("Error deleting a file");
      }
    });
    console.log("delete file");
  };

  const addToFile = async (path, content) => {
    if (!content) console.log("There is no content");

    try {
      await fs.access(path);
      await fs.writeFile(path, content);

      console.log("Content add to the file");
    } catch (error) {
      return console.log("File does not exist");
    }
  };

  const renameFile = async (oldPath, newPath) => {
    const existing = await fs.access(oldPath);

    if (!existing) console.log("File does not exist");

    await fs.rename(oldPath, newPath);

    return console.log("File name rename successfully");
  };

  const commandFileHandler = await fs.open("./command.txt", "r");

  // open a file
  // read a file

  commandFileHandler.on("change", async () => {
    const size = (await commandFileHandler.stat()).size;
    const buff = Buffer.alloc(size);

    const offset = 0;
    const length = buff.byteLength;
    const position = 0;

    await commandFileHandler.read(buff, offset, length, position);
    const command = buff.toString("utf-8");

    if (command.includes(CREATE_FILE)) {
      const filepath = command.substring(CREATE_FILE.length + 1);
      createFile(filepath);
    }

    if (command.includes(RENAME_FILE)) {
      const _ndx = command.indexOf(" to ");

      const oldPath = command.substring(RENAME_FILE.length + 1, _ndx);
      const newPath = command.substring(_ndx + 4);

      renameFile(oldPath, newPath);
    }

    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      deleteFile(filePath);
    }

    if (command.includes(ADD_TO_FILE)) {
      const _ndx = command.indexOf(" this content: ");

      const test = "add to the file";

      const path = command.substring(test.length + 1, _ndx);
      const content = command.substring(_ndx + 15);

      addToFile(path, content);
    }
  });

  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
