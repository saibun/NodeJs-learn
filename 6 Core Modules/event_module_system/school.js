const EventEmitter = require("events");
const emitter = new EventEmitter();
function period(){
	console.log("School start");

	setTimeout(()=>{
		//register event
		emitter.emit("school end","6pm");
		//this line will not print because we use two different EventEmitter object in this two files. Even its name same but actually both are different object. Follwo event_module_right_way to know the right process
	},2000);
}
module.exports = {period};