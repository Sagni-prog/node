const fs = require('fs');

setTimeout(() => console.log("Timer 1"),0);
setImmediate(() => console.log("Immediate"));

fs.readFile('./files/input.txt','utf-8',() => {
  console.log('I/O processed');
});

console.log("synchroneous");



