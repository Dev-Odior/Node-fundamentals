const { Buffer } = require("buffer");
const { rename } = require("fs");

const fs = require("fs/promises");

// Async generator and async iterator
// the watcher could accept a directory or a filename

// open the file
// read or write or get information

(async () => {
  // commands
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete a file";
  const RENAME_FILE = "rename a file";
  const ADD_TO_FILE = "add to the file";

  const createFile = async (path) => {
    try {
      // we want to check if the file already exists on the system
      let existingFileHandler = await fs.open(path, "r");
      existingFileHandler.close();
      return console.log(`File path ${path} already exists`);
    } catch (error) {
      // we don't have the file , now we should create it
      const newFileHandler = await fs.open(path, "w");
      console.log("a new file was successfully created");
      newFileHandler.close();
    }
  };

  const deleteFile = async (path) => {
    fs.unlink(path, (err) => {
      if (err) {
        return console.log(`Error deleting file`);
      }

      return console.log("File does not exist");
    });
  };

  const renameFile = async (oldPath, newPath) => {
    try {
      await fs.access(oldPath); // Check if file exists

      await fs.rename(oldPath, newPath); // Rename the file
      console.log(`File renamed to ${newPath}`);
    } catch (error) {
      console.error(`There was an error: ${error.message}`);
    }
  };

  let addedContent;
  const addToFile = async (path, content) => {
    if (addedContent === content) return;
    try {
      const fileHandle = await fs.open(path, "a");
      fileHandle.write(content);
      addedContent = content;
      console.log(`File written successfully to ${path}`);
    } catch (error) {
      console.error(`Error writing file: ${error.message}`);
    }
  };

  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    // Get the size of the file
    const size = (await commandFileHandler.stat()).size;

    // Allocate the buffer based on the file size
    const buffer = Buffer.alloc(size);

    // Location where we want the reading of the file to start from
    const offset = 0;

    // How many bits we want to be read
    const length = buffer.byteLength;

    // At what part of the buffers should the reading start from
    const position = 0;

    // we always want to read the whole content from beginning all the way to the end
    await commandFileHandler.read(buffer, offset, length, position);

    const command = buffer.toString("utf-8");

    // create a file
    // create a file <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    // delete a file
    // delete the file <path>
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    // rename a file
    // rename a file <path> to <newPath>
    if (command.includes(RENAME_FILE)) {
      const index = command.indexOf(" to ");

      // for the substring you could have a start to finish
      const oldPath = command.substring(RENAME_FILE.length + 1, index);

      const newPath = command.substring(index + 4);

      renameFile(oldPath, newPath);
    }

    // add to file
    // add to file <path> this content: <content>
    if (command.includes(ADD_TO_FILE)) {
      const index = command.indexOf(" this content: ");
      const filePath = command.substring(ADD_TO_FILE.length + 1, index);

      const content = command.substring(index + 15);

      addToFile(filePath, content);
    }
  });

  // watcher....
  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();

// decoder 01 => meaningful
// encoder meaningful => o1

// node js only understands character decoding
// for things like images we would need a third party package
