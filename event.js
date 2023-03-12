const eventEmitter = require('events');
const { EventEmitter } = require('stream');

const event = new EventEmitter();

event.on('order',() => {
  console.log("you have sucessfully placed your order");
});

event.emit('order');