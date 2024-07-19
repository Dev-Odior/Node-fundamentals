const { Buffer } = require("buffer");

const buffer = Buffer.alloc(10000, 0);

const unsafe = Buffer.allocUnsafe(10000);

// for (let i = 0; i < unsafe.length; i++) {
//   if (unsafe[i] !== 0) {
//     console.log(
//       `Element at position ${i} has value: ${unsafe[i].toString(2)} `
//     );
//   }
// }

console.log(Buffer.poolSize);


Buffer.from
Buffer.concat

// The two shii above uses the allocUnsafe 

// console.log(buffer);
// console.log(unsafe);

// when you use buffer unsafe make sure you add a value asap if not sensitive data could be taken and used by hackers

// unsafe is much more faster


const typeArray = new Uint8Array()