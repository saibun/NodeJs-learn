const EventEmitter = require("events");
class School extends EventEmitter{
	period(){
		console.log("School start");
		setTimeout(()=>{
			this.emit("school end","6pm");
		},2000);
	}
}

module.exports = School;