const fs = require('fs');
const cryoto = require('crypto');


const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 2;
setTimeout(() => console.log("Timer 1"),0);
setImmediate(() => console.log("Immediate"));

fs.readFile('./files/input.txt','utf-8',() => {
  console.log('I/O processed');
  
  setTimeout(() => console.log("Timer 2 from callback"),0);
  setTimeout(() => console.log("Timer 3 from callback"),2000);
  setImmediate(() => console.log("Immediate 2 from callback"));
  
  process.nextTick(() => console.log("process.nettTick"));
  cryoto.pbkdf2Sync('password','salt',100000,1024,'sha512');
  console.log(Date.now()-start, " password encrypted sync")
  cryoto.pbkdf2('password','salt',100000,1024,'sha512', () => {
   console.log(Date.now() - start, ' encrypted');
  });
  cryoto.pbkdf2('password','salt',100000,1024,'sha512', () => {
   console.log(Date.now() - start, ' encrypted');
  });
  cryoto.pbkdf2('password','salt',100000,1024,'sha512', () => {
   console.log(Date.now() - start, ' encrypted');
  });
  
  
  cryoto.pbkdf2('password','salt',100000,1024,'sha512', () => {
   console.log(Date.now() - start, ' encrypted');
  });
});

console.log("syn chroneous");



