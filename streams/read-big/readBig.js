const fs = require("fs/promises");

// High water mark for read stream buffer is 64kb

(async () => {
  const fileHandleRead = await fs.open("src.txt", "r");
  const fileHandleWrite = await fs.open("dest.txt", "w");

  const streamRead = fileHandleRead.createReadStream({ highWaterMark: 400 });
  const streamWrite = fileHandleWrite.createWriteStream();

  // this below is what enables me read without the event no reading of anything
  streamRead.on("data", (chunk) => {
    const data = chunk.toString("utf-8").split("  ");

    console.log(data);

    if (!streamWrite.write(chunk)) {
      streamRead.pause();
    }

    streamWrite.on("drain", () => {
      streamRead.resume();
    });
  });
})();
