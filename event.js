const eventEmitter = require('events');
const http = require('http');
const { EventEmitter } = require('stream');

const event = new EventEmitter();

event.on('order',() => {
  console.log("you have sucessfully placed your order");
});

event.emit('order');

const server = http.createServer();

server.on('request',(req,res) => {

    console.log("request recieved")
    console.log(req.url)
   res.end("hello this is the request");
});
server.on('request',(req,res) => {
    console.log("request recieved")
});

server.on('close',(req,res) => {
   console.log('server closing')
});

server.listen(7000,() => {
    console.log("server running on port 7000");
});