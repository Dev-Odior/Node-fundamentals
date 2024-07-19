// 0100 1000 0110 1001 0010 0001

const { Buffer } = require("buffer");
const { measureMemory } = require("vm");

const memoryContainer = Buffer.alloc(6);

memoryContainer[0] = 0x4;
memoryContainer[1] = 0x8;
memoryContainer[2] = 0x6;
memoryContainer[3] = 0x9;
memoryContainer[4] = 0x2;
memoryContainer[5] = 0x1;

// each buffer array contains 8 bits

const buff = Buffer.alloc(3); // 24 bits /8 => 3 bytes

buff[0] = 0x48;
buff[1] = 0x69;
buff[2] = 0x21;

console.log(buff.toString("utf-8"));
