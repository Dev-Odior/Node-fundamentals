// const fs = require("fs/promises");

// 20s

// (async () => {
//   //create the file

//   await fs.open("./test.txt", "w");

//   console.time("writeMany");

//   for (let i = 0; i < 30000; i++) {
//     const file = await fs.open("./test.txt", "a");
//     try {
//       await file.write(` ${i} `);
//     } finally {
//       await file.close();
//     }
//   }

//   console.timeEnd("writeMany");

//   // write my logic on the file
// })();

const fs = require("fs/promises");

//193.142ms

// (async () => {
//   //create the file

//   console.time("writeMany");
//   fs.open("./test.txt", "w", (err, fd) => {
//     const buff = Buffer.from(" a ", "utf-8");
//     for (let i = 0; i < 30000; i++) {
//       fs.writeSync(fd, buff);
//     }

//     console.timeEnd("writeMany");
//   });

//   // write my logic on the file
// })();

// 30s
// this code although fast is bad practice
// (async () => {
//   //create the file

//   console.time("writeMany");

//   const fileHandle = await fs.open("test.txt", "w");

//   const stream = fileHandle.createWriteStream();

//   for (let i = 0; i < 10000000; i++) {
//     const buff = Buffer.from(` ${i} `, "utf-8");
//     stream.write(buff);
//   }

//   console.timeEnd("writeMany");

//   // write my logic on the file
// })();

// this code although fast is bad practice
(async () => {
  //create the file

  console.time("writeMany");

  const fileHandle = await fs.open("test.txt", "w");

  // stream object
  const stream = fileHandle.createWriteStream();

  // console.log(stream.writableHighWaterMark);

  // const buff = Buffer.alloc(16383, 10);
  // console.log(stream.write(buff));
  // console.log(stream.write(Buffer.alloc(1, "a")));

  // stream.on("drain", () => {
  //   console.log("we are now safe to write more");
  // });

  let i = 0;

  const writeMany = () => {
    while (i < 100000) {
      const buff = Buffer.from(` ${i} `, "utf-8");

      if (1 === 999999) {
        return stream.end(buff);
      }

      if (!stream.write(buff)) break;

      i++;
    }
  };

  writeMany();

  stream.on("drain", () => {
    console.log("Drained!!");
    writeMany();
  });

  // if it is true - keep filling else drain and start over

  // console.timeEnd("writeMany");

  stream.on("finish", () => {
    console.timeEnd("Finished Looping");
    fileHandle.close();
  });

  // write my logic on the file
})();
