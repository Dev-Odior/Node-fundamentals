const { Buffer } = require("buffer");
const { log } = require("console");

// const memoryContainer = Buffer.alloc(5); // 4 bytes (32 bits)

// // memoryContainer[3];

// memoryContainer[0] = 0xf4;
// memoryContainer[1] = 0x34;
// memoryContainer[2] = 0xb4;
// memoryContainer[3] = 0xb5;
// memoryContainer[4] = 0xff;

// console.log(memoryContainer.toString("hex"));

// const buff = Buffer.from([0x48, 0x69, 0x21]);

// const buff = Buffer.from("486921", "hex");
// console.log(buff.toString("utf-8"));

const buff = Buffer.from("Hi!", "utf-8");
console.log(buff);
