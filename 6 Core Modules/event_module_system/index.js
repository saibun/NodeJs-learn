const EventEmitter = require("events");
const emitter = new EventEmitter();

//register a listner
emitter.on("school end",(endTime)=>{
	console.log(`school end at ${endTime}. GO home and Play`);

});
const fromschool = require('./school.js');
fromschool.period();