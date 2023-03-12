const fs = require('fs');

setTimeout(() => console.log("Timer 1"),0);
setImmediate(() => console.log("Immediate"));

fs.readFile('./files/input.txt','utf-8',() => {
  console.log('I/O processed');
  
  setTimeout(() => console.log("Timer 2 from callback"),0);
  setTimeout(() => console.log("Timer 3 from callback"),2000);
  setImmediate(() => console.log("Immediate 2 from callback"));
  
  process.nextTick(() => console.log("process.nettTick"));
});

console.log("syn chroneous");



